# Architecture

- `index.html` is the entry document and provides basic page content.
- `index.html` defines a `<meta name="baseURL" content="index.php">` tag for base URL configuration.
- `index.html` defines `<link rel="icon" href="favicon.ico" sizes="any">` for favicon loading.
- `index.html` includes a `<button class="hello" onclick="hello()">Hello</button>` demo trigger.
- `favicon.ico` is a 16x16 icon with a dark blue dot on a transparent background.
- `viewlink.js` is the browser bundle generated from `src/viewlink.ts`.
- `demo.js` is the browser bundle generated from `src/demo.ts`.
- The page loads `viewlink.js` as an ES module via a script tag.
- The page loads `demo.js` as an ES module via a script tag.
- `src/viewlink.ts` defines and exports `viewlink_invoke(path, json_obj)` for POSTing JSON requests.
- `src/viewlink.ts` resolves request URLs with `new URL(path, document.baseURI)`.
- `src/viewlink.ts` attaches `viewlink_invoke` to `window` for direct browser-console and non-import usage.
- `src/demo.ts` defines `hello()` and calls `viewlink_invoke("index.php/hello", {})`, then assigns it to `window.hello`.
- `src/window.d.ts` defines global `Window` typings for `window.viewlink_invoke` and `window.hello`.
- `src/tsconfig.json` is scoped to include TypeScript sources under `src/` via relative include globs.
- `index.php` routes using `$_SERVER['PATH_INFO']`, handles `POST` requests to `/hello`, and returns `{"invoke":"hello world"}` as JSON.

## Build remarks for generated files

- Generated browser artifacts are `viewlink.js`, `viewlink.js.map`, `demo.js`, and `demo.js.map` in the project root.
- Source files for these artifacts are `src/viewlink.ts` and `src/demo.ts`.
- To validate/build TypeScript without running `esbuild`, run `tsc --project src/tsconfig.json --noEmit`.
- If generated JavaScript artifacts are changed, keep the matching `.map` files in sync in the same commit.
