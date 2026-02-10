# Overview

This project aims at generating a javascript library that simplifies the development of web based remote control.

- the user registers with the library:
    - EventHandlers that take the event as an argument
    - ReturnHandlers that take the original event and a json as argument

- EventHandlers can use `viewlink_fetch` to communicate with the server
    - it sends a json structure as the body in a Post method
    - the server can respond with JSON
    - return-handler dispatch by response `type` is planned but not implemented yet
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
    - handlers are registered via `registerReturnHandler(eventType, handler)`.
    - currently stored for future use; `viewlink_fetch` does not yet dispatch response data through this map.

# Functions
 - `registerViewlinkHandler(eventType, handler)`
     - stores `handler` inside `viewlink_handlers[eventType][handler.name]` and attaches a single document listener that delegates events with the matching `data-action`.
- `registerReturnHandler(eventType, handler)`
    - stores a return data handler in `return_handlers` for a future response-dispatch step.
- `viewlink_fetch(path, event, json_obj)` 
    - uses POST to fetch a json object from `document.baseURI+path` with json_obj as the body and content-type application/json. 
    - it retrieves the response and parse it into a json object
    - it currently logs the full returned object.
    - TODO: dispatch the response object(s) via `return_handlers`.
