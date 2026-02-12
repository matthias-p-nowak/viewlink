export type ViewlinkEventHandler = (event: Event) => void;
export type ReturnDataHandler = (event: Event, data: unknown) => void;

const viewlink_handlers = new Map<string, Map<string, ViewlinkEventHandler>>();
const return_handlers = new Map<string, ReturnDataHandler>();
let listenSource: EventSource | null = null;
let listenUrl: string | null = null;

/**
 * Send a POST request to the specified URL with the given JSON object as the body.
 * The base URL comes from document.baseURI (typically influenced by <base href="...">).
 * The request is sent with the Content-Type header set to "application/json".
 * If the response is not OK, an Error is thrown with the response status and status text.
 * If the response is OK, the JSON response is parsed and dispatched to a registered ReturnDataHandler.
 * @param {string} path - The path to send the request to, relative to the base URL.
 * @param {Event} event - The event that triggered the request.
 * @param {unknown} json_obj - The JSON object to send as the request body.
 */
export async function viewlink_fetch(path: string, event: Event, json_obj: unknown) {
    const url = new URL(path, document.baseURI).toString();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json_obj),
    });
    if (!response.ok) {
        throw new Error(`viewlink_fetch failed: ${response.status} ${response.statusText}`);
    }
    const data: unknown = await response.json();
    console.log("returned", data);
    handleReturnData(event, data);
}

/**
 * Opens an SSE connection to receive server events and dispatches payloads
 * through the same return-data handlers used by viewlink_fetch.
 * Repeated calls with the same URL are ignored.
 * Repeated calls with a different URL replace the active connection.
 * @param {string} path - The SSE endpoint path, resolved against document.baseURI.
 */
export function viewlink_listen(path: string): void {
    const resolvedUrl = new URL(path, document.baseURI).toString();
    if (listenSource && listenUrl === resolvedUrl) {
        return;
    }

    if (listenSource) {
        listenSource.close();
        listenSource = null;
        listenUrl = null;
    }

    console.log("viewlink_listen: connecting", resolvedUrl);
    const source = new EventSource(resolvedUrl);
    listenSource = source;
    listenUrl = resolvedUrl;

    source.onopen = () => {
        console.log("viewlink_listen: connected", resolvedUrl);
    };

    source.onmessage = (message: MessageEvent<string>) => {
        try {
            const parsedData: unknown = JSON.parse(message.data);
            handleReturnData(new Event("viewlink_listen"), parsedData);
        } catch (error) {
            console.error("viewlink_listen: invalid JSON payload", error, message.data);
        }
    };

    source.onerror = (error: Event) => {
        console.warn("viewlink_listen: connection error, browser will retry", error);
    };
}

/**
 * Handles returned data from the server.
 * Arrays are recursively processed item-by-item.
 * Objects with a string `type` are matched to a registered return handler.
 * If no matching handler exists, the data is ignored.
 * Matching handlers receive the original event and the response object.
 * @param {Event} event - The original event that triggered the request.
 * @param {unknown} data - The returned data from the server.
 */
function handleReturnData(event: Event, data: unknown): void {
    if (!data || typeof data !== "object") {
        return;
    }
    if (Array.isArray(data)) {
        data.forEach(element => {
            handleReturnData(event, element);
        });
        return;
    }
    const action = (data as { type?: unknown }).type;
    if (typeof action !== "string") {
        return;
    }
    const handler = return_handlers.get(action);
    if (!handler) {
        return;
    }
    handler(event, data);
}


/**
 * Handles an event by finding the first ancestor element with a dataset property of "action".
 * If the element is found, it calls the handler registered for the event type and the action name.
 * If the handler is not registered, it continues to the parent element until it finds a matching handler or reaches the root element.
 * @param {Event} event - The event to handle.
 */
async function handle_viewlink(event: Event): Promise<void> {
    console.log("handle_viewlink", event.type, event.target);
    const handlers = viewlink_handlers.get(event.type);
    if (!handlers) {
        return;
    }
    let current: EventTarget | null = event.target;
    while (current && current instanceof HTMLElement) {
        const action = current.dataset.action;
        if (action) {
            const handler = handlers.get(action);
            if (handler) {
                handler(event);
                break;
            }
        }
        current = current.parentElement;
        console.log("gone to parent", current);
    }
}

/**
 * Registers an event handler for a specific event type.
 * If the event type is not already registered, it will attach a document listener for the event type.
 * The handler is stored in a map with the event type as the key and the handler name as the value.
 * When the event is triggered, the handler is called with the event object as the argument.
 * @param {string} eventType - The type of event to listen for.
 * @param {ViewlinkEventHandler} handler - The event handler to call when the event is triggered.
 */
export function registerViewlinkHandler(
    eventType: string,
    handler: ViewlinkEventHandler
): void {
    let handlers = viewlink_handlers.get(eventType);
    if (!handlers) {
        console.log("registerViewlinkHandler: registering document listener", eventType);
        handlers = new Map<string, ViewlinkEventHandler>();
        viewlink_handlers.set(eventType, handlers);
        document.addEventListener(eventType, handle_viewlink);
    }
    handlers.set(handler.name, handler);
}

/**
 * Registers a return data handler.
 * Handler names are used as the dispatch key (matching response `type`).
 * When matched, the handler is called with the original event and response data.
 * @param {ReturnDataHandler} handler - The return data handler to call when the data is received.
 */
export function registerReturnHandler(
    handler: ReturnDataHandler
): void {
    console.log("registerReturnHandler", handler.name);
    return_handlers.set(handler.name, handler);
}   

console.log("viewlink loaded");
