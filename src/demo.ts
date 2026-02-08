import { viewlink_invoke } from "./viewlink";

export async function hello(): Promise<void> {
    const result = await viewlink_invoke("index.php/hello", {});
    console.log(result);
}

window.hello = hello;
