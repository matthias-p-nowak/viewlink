# Context

## Current request
Add remarks how to build the generated files to architecture.md

## Prompt log
- 2026-02-09 consolidated summary:
  - Refactored `src/viewlink.ts` listener registration by removing `registeredListeners` and deduplicating `document` listeners through first creation of each event-type handler map.
  - Updated documentation to match runtime behavior, including `docs/architecture.md` and this prompt log in `docs/context.md`.
  - Diagnosed duplicate `handle_viewlink` calls on single click: when both `viewlink.js` and `demo.js` are loaded, each bundled copy of `src/viewlink.ts` registers its own listener.
  - Confirmed that loading only `demo.js` avoids duplicate calls in the current build because `demo.js` bundles ViewLink runtime internally.
  - Confirmed root cause is esbuild per-entry bundling with `--bundle`, which inlines imported dependencies into each output bundle.
  - Confirmed current page script-loading state in `index.html` is `demo.js` only.
