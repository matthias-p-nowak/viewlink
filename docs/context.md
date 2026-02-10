# Context

## Prompt log
- 2026-02-10:
  - Fixed TypeScript compile conflicts by removing `webworker` from `src/tsconfig.json` `lib`, leaving `["dom", "es2021"]`.
  - Updated `docs/architecture.md` to document the tsconfig lib choice and its purpose.
- 2026-02-10:
  - Implemented an API/docs consistency pass using code-as-source: aligned architecture and design docs to `viewlink_fetch`, `data-action`, current handler registration signatures, and current exported globals.
  - Updated `src/window.d.ts` so `window.viewlink_fetch` matches the async runtime signature (`Promise<void>`).
  - Kept return-handler response dispatch as a documented TODO without changing runtime behavior.
- 2026-02-10:
  - Confirmed `viewlink.js` is no longer necessary, removed stale `viewlink.js` references from `docs/architecture.md`, and verified no `viewlink.js` / `viewlink.js.map` artifacts were present to delete.
- 2026-02-10:
  - Implemented the `add logging` comment in `src/viewlink.ts` by adding a listener-registration log inside `registerViewlinkHandler` when a new event type is first registered.
- 2026-02-09 consolidated summary:
  - Refactored `src/viewlink.ts` listener registration by removing `registeredListeners` and deduplicating `document` listeners through first creation of each event-type handler map.
  - Updated documentation to match runtime behavior, including `docs/architecture.md` and this prompt log in `docs/context.md`.
  - Diagnosed duplicate `handle_viewlink` calls on single click: when both `viewlink.js` and `demo.js` are loaded, each bundled copy of `src/viewlink.ts` registers its own listener.
  - Confirmed that loading only `demo.js` avoids duplicate calls in the current build because `demo.js` bundles ViewLink runtime internally.
  - Confirmed root cause is esbuild per-entry bundling with `--bundle`, which inlines imported dependencies into each output bundle.
  - Confirmed current page script-loading state in `index.html` is `demo.js` only.
