import { registerViewlinkHandler, viewlink_invoke } from "./viewlink";

export async function hello(): Promise<void> {
    console.log("hello called");
    const result = await viewlink_invoke("index.php/hello", {});
    console.log(result);
}

registerViewlinkHandler("click", "hello", hello);
console.log("demo loaded");