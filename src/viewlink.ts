export type ViewlinkEventHandler = (event: Event) => void;
export type ReturnDataHandler = (target: EventTarget, data: unknown) => void;

const viewlink_handlers = new Map<string, Map<string, ViewlinkEventHandler>>();
const return_handlers = new Map<string, ReturnDataHandler>();

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
    // todo act on the data using the return_handlers 
}


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
                await handler(event);
                break;
            }
        }
        current = current.parentElement;
        console.log("gone to parent", current);
    }
}

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

export function registerReturnHandler(
    eventType: string,
    handler: ReturnDataHandler
): void {
    return_handlers.set(eventType, handler);
}   


window.viewlink_fetch = viewlink_fetch;
window.registerViewlinkHandler = registerViewlinkHandler;

console.log("viewlink loaded");
