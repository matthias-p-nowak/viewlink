import * as viewlink from "./viewlink";

export function hello(event: Event) {
    console.log("hello called");
    viewlink.viewlink_fetch("index.php/hello", event, {});
}

viewlink.registerViewlinkHandler("click", hello);

export function world(event: Event, data: unknown) {
    console.log("world called", data);
}

viewlink.registerReturnHandler(world);

console.log("demo loaded");
