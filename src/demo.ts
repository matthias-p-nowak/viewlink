import * as viewlink from "./viewlink";

export function hello(event: Event) {
    console.log("hello called");
    viewlink.viewlink_fetch("hello", event, {});
}

viewlink.registerViewlinkHandler("click", hello);

export function world(event: Event, data: unknown) {
    console.log("world called", data);
}

viewlink.registerReturnHandler(world);
viewlink.viewlink_listen("listen");

console.log("demo loaded");
