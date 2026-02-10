interface Window {
    viewlink_fetch: (path: string, event: Event, json_obj: unknown) => Promise<void>;
    registerViewlinkHandler: (
        eventType: string,
        handler: (event: Event) => void
    ) => void;
}
