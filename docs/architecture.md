# Architecture

- `index.html` is the entry document and provides basic page content.
- `viewlink.js` is the browser bundle generated from `src/viewlink.ts`.
- The page loads `viewlink.js` as an ES module via a script tag.
- `src/viewlink.ts` registers `hello` as a document-level click event handler.
