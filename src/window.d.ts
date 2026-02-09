interface Window {
    viewlink_invoke: (path: string, json_obj: unknown) => Promise<unknown>;
    viewlink_onclick: (event: Event) => void;
    registerViewlinkHandler: (
        eventType: string,
        action: string,
        handler: (event: Event) => void
    ) => void;
}
