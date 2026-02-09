export async function viewlink_invoke(path: string, json_obj: unknown): Promise<unknown> {
    const url = new URL(path, document.baseURI).toString();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json_obj),
    });

    if (!response.ok) {
        throw new Error(`viewlink_invoke failed: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    const invokeValue =
        typeof data === "object" && data !== null && "invoke" in data
            ? (data as Record<string, unknown>).invoke
            : undefined;
    console.log(invokeValue);
    return data;
}

export type ViewlinkEventHandler = (event: Event) => void;

const viewlink_handlers = new Map<string, Map<string, ViewlinkEventHandler>>();
const registeredListeners = new Set<string>();

function ensureDispatcher(eventType: string): void {
    if (registeredListeners.has(eventType)) {
        return;
    }

    registeredListeners.add(eventType);
    document.addEventListener(eventType, (event) => {
        const handlers = viewlink_handlers.get(eventType);
        if (!handlers) {
            return;
        }

        let current: EventTarget | null = event.target;
        while (current && current instanceof Element) {
            const action = current.getAttribute("data-viewlink-action");
            if (action) {
                const handler = handlers.get(action);
                if (handler) {
                    handler(event);
                    break;
                }
            }
            current = current.parentElement;
        }
    });
}

export function registerViewlinkHandler(
    eventType: string,
    action: string,
    handler: ViewlinkEventHandler
): void {
    let handlers = viewlink_handlers.get(eventType);
    if (!handlers) {
        handlers = new Map<string, ViewlinkEventHandler>();
        viewlink_handlers.set(eventType, handlers);
    }

    handlers.set(action, handler);
    ensureDispatcher(eventType);
}

export function viewlink_onclick(event: Event): void {
    console.log("viewlink_onclick", event.type, event.target);
}

registerViewlinkHandler("click", "viewlink_onclick", viewlink_onclick);

window.viewlink_invoke = viewlink_invoke;
window.viewlink_onclick = viewlink_onclick;
window.registerViewlinkHandler = registerViewlinkHandler;
