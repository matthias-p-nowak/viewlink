interface Window {
    viewlink_invoke: (path: string, json_obj: unknown) => Promise<unknown>;
    hello: () => Promise<void>;
}
