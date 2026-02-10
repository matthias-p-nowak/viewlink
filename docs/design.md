# Overview

This project aims at generating a javascript library that simplifies the development of web based remote control.

- the user registers with the library:
    - EventHandlers that take the event as an argument
    - ReturnHandlers that take the original event and a json as argument

- EventHandlers can use `viewlink_fetch` to communicate with the server
    - it sends a json structure as the body in a Post method
    - the server can respond with JSON
    - response dispatch uses response `type` values to resolve return handlers
    - array responses are recursively processed and each object item is dispatched
    - a matching registered return handler is called when found
- The library listens on the document for certain events see `handle_viewlink`
    - the `data-action` is the name of the EventHandler to use


# Files
- `index.html` is the original landing page
- `index.php` is an example for a backend that gets Rest-API requests with json as the Post payload and returns a json structure.
- `src/viewlink.ts` contains the library functionality
- `src/demo.ts` contains the example usage

# Datastructures
- `viewlink_handlers`
    - private `Map<string, Map<string, ViewlinkEventHandler>>` keyed first by event type and then by handler name (`handler.name`).
    - the dispatcher registered per event type walks up from `event.target` looking for a `data-action` attribute and runs the mapped handler for the first match.
    - handlers are registered via `registerViewlinkHandler(eventType, handler)` which also ensures the document listener is attached.
- `return_handlers`
    - private `Map<string, ReturnDataHandler>` keyed by a return-event type string.
    - handlers are registered via `registerReturnHandler(handler)`.
    - actively used by `handleReturnData(event, data)` during `viewlink_fetch` response processing.

# Functions
 - `registerViewlinkHandler(eventType, handler)`
     - stores `handler` inside `viewlink_handlers[eventType][handler.name]` and attaches a single document listener that delegates events with the matching `data-action`.
- `registerReturnHandler(handler)`
    - stores a return data handler in `return_handlers`, keyed by `handler.name`.
- `viewlink_fetch(path, event, json_obj)` 
    - uses POST to fetch a json object from `document.baseURI+path` with json_obj as the body and content-type application/json. 
    - it retrieves the response and parse it into a json object
    - it logs the full returned object.
    - it dispatches the response object(s) via `return_handlers` using the `type` field.
