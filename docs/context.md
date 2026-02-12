# Context

## Prompt log

- 2026-02-09 to 2026-02-12 consolidated summary:
  - Kept event delegation architecture in `src/viewlink.ts` with one document listener per event type and `data-action`-based handler resolution, plus return payload dispatch through `handleReturnData(event, data)` and `type`-matched `return_handlers`.
  - Implemented SSE support via `viewlink_listen(path)` using a singleton `EventSource` connection (`listenSource`, `listenUrl`), same-URL idempotency, replacement on URL change, JSON parsing of `message.data`, and reuse of existing `type` dispatch by calling `handleReturnData(new Event("viewlink_listen"), payload)`.
  - Extended backend routing in `index.php` with `GET /listen` server-sent events (`text/event-stream`, `Cache-Control: no-cache`, reconnect hint, periodic JSON `data:` frames) while preserving `POST /hello`.
  - Switched from metadata base configuration to HTML base handling in `index.html` using `<base href="index.php/">`, and updated static asset URLs to absolute root paths (`/demo.js`, `/favicon.ico`) so assets remain stable.
  - Updated `src/demo.ts` to use base-relative API paths (`"hello"`, `"listen"`) instead of explicit `"index.php/..."` prefixes.
  - Synced docs to match runtime behavior in `docs/design.md`, `docs/architecture.md`, and updated comments in `src/viewlink.ts`.
