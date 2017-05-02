# Neutrino TypeScript loader middleware

[![npm](https://img.shields.io/npm/v/neutrino-middleware-typescript-loader.svg)](https://www.npmjs.com/package/neutrino-middleware-typescript-loader)
[![npm](https://img.shields.io/npm/dt/neutrino-middleware-typescript-loader.svg)](https://www.npmjs.com/package/neutrino-middleware-typescript-loader)

`neutrino-middleware-typescript-loader` is a [Neutrino](https://neutrino.js.org) middleware for compiling TypeScript files with [awesome-typescript-loader
](https://github.com/s-panferov/awesome-typescript-loader). It is compatible with **.ts** and **.tsx** files.

## Requirements

* Node.js v6.9+
* Neutrino v5

## Installation

`neutrino-middleware-typescript-loader` can be installed from NPM.

```
❯ npm install --save neutrino-middleware-typescript-loader
```

## Usage

`neutrino-middleware-typescript-loader` can be consumed from the Neutrino API, middleware, or presets. Require this package and plug it into Neutrino:

```js
const typeScriptLoader = require('neutrino-middleware-typescript-loader')

neutrino.use(typeScriptLoader, {
  include: [],
  exclude: []
})
```

* `include` - optional array of paths to include in the compilation. Maps to Webpack's Rule.include
* `exclude` - optional array of paths to exclude from the compilation. Maps to Webpack's Rule.include

It is recommended to call this middlware after `neutrino.config.module.rule('compile')` initialization to avoid unexpected overriding. More imformation about usage of Neutrino middlwares can be found in the [documentation](https://neutrino.js.org/middleware).

## Rules

This is a list of rules that are used by `neutrino-middleware-typescript-loader`:

* `type`: Compiles TypeScript files to JavaScript modules. Contains a single loader named `typescript`.
* `compile`: Only necessary file extension added.


