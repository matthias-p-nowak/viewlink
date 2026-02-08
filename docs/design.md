# Overview

This project aims at generating a javascript library hat simplifies the development of web based remote control.

User interactions are catched by eventlisteners attached to the document.
Based on the event type and classes on the event.target element, certain functions are executed.
When the server needs to be invoked, the invoke function is called with a path and a json object as arguments.
The return from the server is handled by the invoke function.

# Functions
