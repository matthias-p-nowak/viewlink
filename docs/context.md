# Context

## Prompt log

- 2026-02-09 to 2026-02-10 consolidated summary:
  - Refactored event listener registration in `src/viewlink.ts` to deduplicate `document` listeners per event type and kept shared `handle_viewlink` dispatch behavior.
  - Added listener-registration logging in `registerViewlinkHandler` and removed stale `viewlink.js` documentation references after confirming `demo.js`-only script loading.
  - Aligned docs with runtime/API behavior (`viewlink_fetch`, `data-action`, handler registration signatures) and documented the `tsconfig` lib choice `["dom", "es2021"]` after resolving type conflicts.
  - Implemented and then refactored return-handler response dispatch in `src/viewlink.ts` to use payload `type` for `return_handlers` resolution via `handleReturnData(event, data)`; noted backend/frontend contract mismatch where `index.php` still returns `invoke`.
  - Updated `src/demo.ts` by replacing the TODO with namespace import style (`import * as viewlink from "./viewlink"`) and switched call sites to `viewlink.viewlink_fetch`, `viewlink.registerViewlinkHandler`, and `viewlink.registerReturnHandler`.
