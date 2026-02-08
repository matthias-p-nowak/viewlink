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

window.viewlink_invoke = viewlink_invoke;
