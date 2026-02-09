# Overview

This project aims at generating a javascript library hat simplifies the development of web based remote control.

User interactions are catched by eventlisteners attached to the document.
Based on the event type and classes on the event.target element, certain functions are executed.
When the server needs to be invoked, the invoke function is called with a path and a json object as arguments.
The return from the server is handled by the invoke function.

# Files
- `index.html` is the original landing page
- `index.php` is an example for a backend that gets Rest-API requests with json as the Post payload and returns a json structure.
- `src/viewlinks.ts` contains the library functionality
- `src/demo.ts` contains the example usage

# Datastructures
- `viewlink_handlers`
    - private `Map<string, Map<string, event_handler>>` keyed first by event type and then by action name.
    - the dispatcher registered per event type walks up from `event.target` looking for a `data-viewlink-action` attribute and runs the mapped handler for the first match.
    - handlers are registered via `registerViewlinkHandler(eventType, action, handler)` which also ensures the document listener is attached.

# Functions
 - `registerViewlinkHandler(eventType, action, handler)`
     - stores `handler` inside `viewlink_handlers[eventType][action]` and attaches a single document listener that delegates events with the matching `data-viewlink-action`.
- `viewlink_invoke(path, json_obj)` 
    - uses POST to fetch a json object from `document.baseURI+path` with json_obj as the body and content-type application/json. 
    - it retrieves the response and parse it into a json object
    - it console.log the field `invoke`.
- `viewlink_onclick(event)`
    - it is an eventlistener that currently console.logs.
    - it is registered via `registerViewlinkHandler("click", "viewlink_onclick", viewlink_onclick)` so the dispatcher attaches it when the module loads.
