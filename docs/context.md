# Context

## Prompt log

- 2026-02-09 to 2026-02-12 consolidated summary:
  - Maintained the event delegation and return-handler maps in `src/viewlink.ts`, added SSE listening via `viewlink_listen`, and wired the backend `index.php` routes to serve `POST /hello` and `GET /listen`.
  - Updated `index.html`, asset URLs, and `src/demo.ts` so base-relative API calls and doc comments reflect the runtime behavior and SSE dispatch contract.
- 2026-02-12 SSE metadata update:
  - Emitted `id`, `event: <type>`, and JSON `data` lines for each server-sent message in `index.php`, noted the change in `docs/architecture.md`, and logged that the generated bundles still need rebuilding from the VSCode tasks.
- 2026-02-13 `good` acknowledgement:
  - Replaced the prior log entries with this consolidated summary per instructions so the "Prompt log" section now explicitly captures all earlier prompts and their outcomes.
