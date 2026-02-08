# Context

## Current request
Implement the `index.php` routing change to use `$_SERVER['PATH_INFO']`.

## Prompt log
- 2026-02-08: "add content and include the reference to viewlink.js"
- 2026-02-08: "Please implement the code as described by the comment on src/viewlink.ts:6"
- 2026-02-08: "Please implement the code as described by the comment on index.html:6"
- 2026-02-08: "Please implement the code as described by the comment on index.html:6 ... insert baseurl = index.php"
- 2026-02-08: "Please implement the code as described by the comment on index.html:6. The comment is: i need the meta baseURL tag and it should point to 'index.php' -->"
- 2026-02-08: "PLEASE IMPLEMENT THIS PLAN: Implement `viewlink_invoke` in `src/viewlink.ts` with POST+JSON, URL resolution via `new URL(..., document.baseURI)`, response parsing/logging of `invoke`, throwing on failures, window exposure, docs updates, and required esbuild rebuild."
- 2026-02-08: "PLEASE IMPLEMENT THIS PLAN: Move `Window` typing from `src/viewlink.ts` to `src/window.d.ts` and rebuild."
- 2026-02-08: "I want demo.ts to be my demo functionality where i can declare a 'hello' function that uses the 'viewlink_invoke' function. In `index.html` i want a button.hello which has an onclick=hello. Add a basic index.php that handles Post for /hello and returns a json object with invoke=\"hello world\"."
- 2026-02-08: "PLEASE IMPLEMENT THIS PLAN: Add Demo Layer (`demo.ts`), Hello Button, and PHP Endpoint at `index.php/hello`."
- 2026-02-08: "No inputs were found in config file '/home/me/projects/ai-code/viewlink/src/tsconfig.json'. Specified 'include' paths were '[\"src\"]' and 'exclude' paths were '[]'."
- 2026-02-08: "Please implement the code as described by the comment on index.php:7. The comment is: $_SERVER['PATH_INFO'] could be used instead"
