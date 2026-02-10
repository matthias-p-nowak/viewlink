# Context

## Prompt log

- 2026-02-09 to 2026-02-10 consolidated summary:
  - Refactored `src/viewlink.ts` listener registration to attach one `document` listener per event type, kept shared `handle_viewlink` dispatch, and added registration logging.
  - Implemented return-data dispatch through `handleReturnData(event, data)` with `type`-based handler lookup and recursive array handling; aligned handler registration with `registerReturnHandler(handler)`.
  - Updated `src/demo.ts` to use namespace imports (`import * as viewlink`) and call `viewlink.viewlink_fetch`, `viewlink.registerViewlinkHandler`, and `viewlink.registerReturnHandler`.
  - Synced docs (`docs/design.md`, `docs/architecture.md`) to current runtime/API behavior, including backend response shape compatibility and TypeScript lib configuration context.
