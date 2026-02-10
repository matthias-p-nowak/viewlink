import { registerViewlinkHandler, registerReturnHandler, viewlink_fetch } from "./viewlink";

export function hello(event: Event) {
    console.log("hello called");
    viewlink_fetch("index.php/hello", event, {});
}

registerViewlinkHandler("click", hello);
console.log("demo loaded");
