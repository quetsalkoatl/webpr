# Week 13 (Modules)

## Refresher

See [../week11/util/utilTest.js -> "util-refresher"](../week11/util/utilTest.js)

## Modules

### Why?

- organize code
- clear dependencies (see below)
- avoid errors: you don't have to change old code, more agile
 
so far:

    <script src="a.js">
    <script src="b.js">
    <script src="c.js">

The user has to be aware the for ex. `c` depends on `b` and include it beforehand.

### Modules are NOT

- Packages
- Dependencies, Libraries, Releases
- Units of publication
- Objects

### A Module IS

- code that uses `import` or `export` keywords
- asynchronous `<script src="./my.js" type="module">`, `import("./my.js").then(mod => ...)`

`import` is always followed by a literal string (no variable)

    import "module-name";
    import defaultExport from "module-name";
    import * as name from "module-name";
    import {export} from "module-name";
    import {export as alias} from "module-name";
    import {export1, export2} from "module-name";
    var promise = import("module-wname");

`export` should always be defined explicitly

    export { name1, name2, …, nameN };
    export function FunctionName(){...}
    export const name1, name2, …, nameN; //or let
    export class ClassName {...}
    export default expression;
    export { name1 as default, … };
    export * from …;
    export { name1, name2, …, nameN } from …; // to export someting from another module

### Impacts

- `implicit "use strict"` -> variables have to be defined before using them
- exports are read only (exported values can not be set by importing script, you can define setter functions in the module)
- no Global objects, no global `this`, no Global hoisting
- implicit "defer" mode -> `document.writeln(...)` is no longer useful
- Modules are Namespaces
- Modules are Singletons (only loaded once)


- Modules are subject of Singe Origin Policy (SOP)
- Problem during development: File System is a "null" origin

### Tools

- Developer Mode (suppresses SOP)
- local webserver
- Bundler (Rollup, Parcel, Webpack, ...)
- Start browser in debug mode