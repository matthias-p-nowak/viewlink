# Context

## Current request
Add remarks how to build the generated files to architecture.md

## Prompt log
- 2026-02-08 summary:
  - Built the core browser invocation flow in `src/viewlink.ts` (`viewlink_invoke` with JSON POST, URL resolution via `document.baseURI`, response parsing/logging, error handling, and `window` exposure), then moved global typings into `src/window.d.ts`.
  - Wired the demo flow end-to-end: added `hello()` in `src/demo.ts`, added `.hello` button wiring in `index.html`, and implemented a minimal `/hello` JSON POST endpoint in `index.php` that returns `{"invoke":"hello world"}`.
  - Updated base URL handling and static assets in the page (`<meta name="baseURL" content="index.php">`, favicon link, and `favicon.ico` dark-blue dot).
  - Addressed TypeScript config/include issues and documented architecture/build expectations, including the explicit preference to stop running `esbuild` directly.
- 2026-02-09:
  - Added a composite VS Code task `run all` in `.vscode/tasks.json` that starts `start-php-server`, `compile typescripts`, and `watch-scss` in parallel.
  - Rewrote `src/viewlink.ts` click action lookup to use `current.dataset.viewlinkAction` instead of `getAttribute("data-viewlink")`.
  - Refactored `src/viewlink.ts` to use a shared `handle_viewlink(event)` dispatcher, moved handler lookup/dispatch into that function, and made `registerViewlinkHandler` attach `document` listeners once per event type while dispatching via `data-viewlink` (`element.dataset.viewlink`).
