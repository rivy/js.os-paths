<!DOCTYPE markdown><!-- markdownlint-disable no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- markdownlint-disable heading-increment no-duplicate-heading -->
<!-- spell-checker:ignore (abbrev/names) CICD CJS Codacy Deno ESM ESMs JSDelivr npmJS -->
<!-- spell-checker:ignore (targets) realclean -->
<!-- spell-checker:ignore (people) rivy -->

# [os-paths](https://github.com/rivy/js.os-paths)

> Determine common OS/platform paths (home, temp, ...)

[![Build status (GHA)][gha-image]][gha-url]
[![Build status (Travis-CI)][travis-image]][travis-url]
[![Build status (AppVeyor)][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Style Guide][style-image]][style-url]
&nbsp; <br/>
[![Repository][repository-image]][repository-url]
[![Deno version][deno-image]][deno-url]
[![NPM version][npm-image]][npm-url]
[![NodeJS version][nodejsv-image]][repository-url]
[![npmJS Downloads][downloads-image]][downloads-url]
[![JSDelivr Downloads][jsdelivr-image]][jsdelivr-url]

## Installation (CJS/ESM/TypeScript)

```shell
npm install os-paths
# or... `npm install "git:github.com/rivy/js.os-paths"`
# or... `npm install "git:github.com/rivy/js.os-paths#v6.3.0"`
# or... `npm install "https://cdn.jsdelivr.net/gh/rivy/js.os-paths/dist/os-paths.tgz"`
```

## Usage

#### CommonJS (CJS)

```js
const osPaths = require('os-paths/cjs');
const home = osPaths.home();
const temp = osPaths.temp();
```

#### ECMAScript (ESM)/TypeScript

```js
import osPaths from 'os-paths';
const home = osPaths.home();
const temp = osPaths.temp();
```

#### Deno

```ts
import osPaths from 'https://deno.land/x/os_paths/src/mod.deno.ts';
//or...
//import osPaths from 'https://deno.land/x/os_paths@v6.3.0/src/mod.deno.ts';
//or (via CDN, with optional version/version-range/latest/commit support)...
//import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths@6.3.0/src/mod.deno.ts'; // v6.3.0
//import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths@6/src/mod.deno.ts'; // v6.x.y
//import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths/src/mod.deno.ts'; // latest
//import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths@latest/src/mod.deno.ts'; // latest
//import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths@COMMIT/src/mod.deno.ts'; // commit
const home = osPaths.home();
const temp = osPaths.temp();
```

##### Required Deno permissions

###### `--allow-env` &middot; _allow access to the process environment variables_

This module/package requires access to various environment variable to determine platform configuration (eg, location of temp and user directories).

## API

### Construction/Initialization

#### `OSPaths()`

```js
const osPaths = require('os-paths/cjs'); // CJS
//or...
//import osPaths from 'os-paths'; // ESM/TypeScript
//import osPaths from 'https://deno.land/x/os_paths/src/mod.deno.ts'; // Deno
```

When importing this module, the object returned is a function object, `OSPaths`, augmented with attached methods. Additional `OSPaths` objects may be constructed by direct call of the imported `OSPaths` object (eg, `const p = osPaths()`) or by using `new` (eg, `const p = new osPaths()`). Notably, since the `OSPaths` object contains no instance state, all `OSPaths` objects will be functionally identical.

### Methods

All methods return simple, platform-specific, and platform-compatible path strings which are normalized and have no trailing path separators.

The returned path strings are _not_ guaranteed to already exist on the file system. So, the user is responsible for directory construction, if/when needed. However, since all of these are _standard_ OS directories, they should all exist without the need for user intervention.

If/when necessary, [`make-dir`](https://www.npmjs.com/package/make-dir) or [`mkdirp`](https://www.npmjs.com/package/mkdirp) can be used to create the directories.

#### `osPaths.home(): string | undefined`

- Returns the path string of the user's home directory (or `undefined` if the user's home directory is not resolvable).

```js
console.log(osPaths.home());
//(*nix) => '/home/rivy
//(windows) =>  'C:\Users\rivy'
```

#### `osPaths.temp(): string`

- Returns the path string of the system's default directory for temporary files.

```js
console.log(osPaths.temp());
//(*nix) => '/tmp'
//(windows) =>  'C:\Users\rivy\AppData\Local\Temp'
```

`temp()` will _always_ return a non-empty path string (as sanely as possible).

## Supported Platforms

### NodeJS

> #### Requirements
>
> NodeJS >= 4.0[^*]

<!--{blockquote: .--info style="font-size:75%;"}-->

[^*]: With the conversion to a TypeScript-based project, due to tooling constraints, building and testing are more difficult and more limited on Node platforms earlier than NodeJS-v10. However, the generated CommonJS/UMD project code is fully tested (for NodeJS-v10+) and continues to be compatible with NodeJS-v4+.

#### CommonJS modules (CJS; `*.js` and `*.cjs`)

CJS is the basic supported output (with support for NodeJS versions as early as NodeJS-v4).

```js
const osPaths = require('os-paths/cjs');
console.log(osPaths.home());
console.log(osPaths.temp());
```

> Note: for CJS, `require('os-paths')` is supported for backward-compatibility and will execute correctly at run-time. However, `require('os-paths')` links to the default package type declarations which, though _correct_ for Deno/ESM/TypeScript, are _incorrect_ for CJS. This, then, leads to incorrect analysis of CJS files by static analysis tools such as TypeScript and Intellisense.
>
> Using `require('os-paths/cjs')` is preferred as it associates the proper CJS type declarations and provides correct information to static analysis tools.

#### ECMAScript modules (ESM; `*.mjs`)

- <small><span title="ESM support added in v6.0">Requires `v6.0`+.</span></small>

`OSPaths` fully supports ESM imports.

```js
import osPaths from 'os-paths';
console.log(osPaths.home());
console.log(osPaths.temp());
```

### TypeScript (`*.ts`)

- <small><span title="TypeScript support added in v5.0">Requires `v5.0`+.</span></small>

As of `v5.0`+, `OSPaths` has been converted to a TypeScript-based module.
As a consequence, TypeScript type definitions are automatically generated, bundled, and exported by the module.

### Deno

- <small><span title="Deno support added in v6.0">Requires `v6.0`+.</span></small>

`OSPaths` also fully supports use by Deno.

```js deno
import osPaths from 'https://deno.land/x/os_paths/src/mod.deno.ts';
console.log(osPaths.home());
console.log(osPaths.temp());
```

## Building and Contributing

[![Repository][repository-image]][repository-url]
[![Build status (GHA)][gha-image]][gha-url]
[![Build status (Travis-CI)][travis-image]][travis-url]
[![Build status (AppVeyor)][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
&nbsp; <br/>
[![Quality status (Codacy)][codacy-image]][codacy-url]
[![Quality status (CodeClimate)][codeclimate-image]][codeclimate-url]
[![Quality status (CodeFactor)][codefactor-image]][codefactor-url]

### Build requirements

- NodeJS >= 10.14
- a JavaScript package/project manager ([`npm`](https://www.npmjs.com/get-npm) or [`yarn`](https://yarnpkg.com))

> #### optional
>
> - [`git-changelog`](https://github.com/rivy-go/git-changelog) (v1.1+) ... enables changelog automation

### Build/test

```shell
npm install-test
```

### Project development scripts

```shell
> npm run help
...
usage: `npm run TARGET` or `npx run-s TARGET [TARGET..]`

TARGETs:

build               build/compile package
clean               remove build artifacts
coverage            calculate and display (or send) code coverage [alias: 'cov']
fix                 fix package issues (automated/non-interactive)
fix:lint            fix ESLint issues
fix:style           fix Prettier formatting issues
help                display help
lint                check for package code 'lint'
lint:commits        check for commit flaws (using `commitlint` and `cspell`)
lint:editorconfig   check for EditorConfig format flaws (using `editorconfig-checker`)
lint:lint           check for code 'lint' (using `eslint`)
lint:markdown       check for markdown errors (using `remark`)
lint:spell          check for spelling errors (using `cspell`)
lint:style          check for format imperfections (using `prettier`)
realclean           remove all generated files
rebuild             clean and (re-)build project
retest              clean and (re-)test project
reset:hard          remove *all* generated files and reinstall dependencies
show:deps           show package dependencies
test                test package
test:code           test package code
test:types          test for type declaration errors (using `tsd`)
update              update/prepare for distribution [alias: 'dist']
update:changelog    update CHANGELOG (using `git changelog ...`)
update:dist         update distribution content
```

### Contributions

Contributions are welcome.

Any pull requests should be based off of the default branch (`master`). And, whenever possible, please include tests for any new code, ensuring that local (via `npm test`) and remote CI testing passes.

By contributing to the project, you are agreeing to provide your contributions under the same [license](./LICENSE) as the project itself.

## Related

- [`xdg-app-paths`](https://www.npmjs.com/package/xdg-app-paths) ... easy XDG for applications
- [`xdg-portable`](https://www.npmjs.com/package/xdg-portable) ... XDG Base Directory paths (cross-platform)

## License

[MIT](./LICENSE) © [Roy Ivy III](https://github.com/rivy)

<!-- badge references -->

<!-- Repository -->
<!-- Note: for '[repository-image] ...', `%E2%81%A3` == utf-8 sequence of "Unicode Character 'INVISIBLE SEPARATOR' (U+2063)"; ref: <https://codepoints.net/U+2063> -->

[repository-image]: https://img.shields.io/github/v/tag/rivy/js.os-paths?sort=semver&label=%E2%81%A3&logo=github&logoColor=white
[repository-url]: https://github.com/rivy/js.os-paths
[license-image]: https://img.shields.io/npm/l/os-paths.svg?color=tomato&style=flat
[license-url]: license
[nodejsv-image]: https://img.shields.io/node/v/os-paths?color=slateblue
[style-image]: https://img.shields.io/badge/code_style-prettier-mediumvioletred.svg
[style-url]: https://prettier.io

<!-- Continuous integration/deployment (CICD) -->

[appveyor-image]: https://img.shields.io/appveyor/ci/rivy/js-os-paths/master.svg?style=flat&logo=AppVeyor&logoColor=deepskyblue
[appveyor-url]: https://ci.appveyor.com/project/rivy/js-os-paths
[gha-image]: https://img.shields.io/github/workflow/status/rivy/js.os-paths/CI?label=CI&logo=github
[gha-url]: https://github.com/rivy/js.os-paths/actions?query=workflow%3ACI
[travis-image]: https://img.shields.io/travis/rivy/js.os-paths/master.svg?style=flat&logo=travis
[travis-url]: https://travis-ci.org/rivy/js.os-paths

<!-- Code quality -->

[coverage-image]: https://img.shields.io/codecov/c/github/rivy/js.os-paths/master.svg
[coverage-url]: https://codecov.io/gh/rivy/js.os-paths
[codeclimate-url]: https://codeclimate.com/github/rivy/js.os-paths
[codeclimate-image]: https://img.shields.io/codeclimate/maintainability/rivy/js.os-paths?label=codeclimate
[codacy-image]: https://img.shields.io/codacy/grade/4fa161040bcd483890691190293ff950?label=codacy
[codacy-url]: https://app.codacy.com/gh/rivy/js.os-paths/dashboard
[codefactor-image]: https://img.shields.io/codefactor/grade/github/rivy/js.os-paths?label=codefactor
[codefactor-url]: https://www.codefactor.io/repository/github/rivy/js.os-paths

<!-- Distributors/Registries -->

[deno-image]: https://img.shields.io/github/package-json/v/rivy/js.os-paths/master?label=deno
[deno-url]: https://deno.land/x/os_paths
[downloads-image]: http://img.shields.io/npm/dm/os-paths.svg?style=flat
[downloads-url]: https://npmjs.org/package/os-paths
[jsdelivr-image]: https://img.shields.io/jsdelivr/gh/hm/rivy/js.os-paths?style=flat
[jsdelivr-url]: https://www.jsdelivr.com/package/gh/rivy/js.os-paths
[npm-image]: https://img.shields.io/npm/v/os-paths.svg?style=flat
[npm-url]: https://npmjs.org/package/os-paths

<!-- Alternate/Old image/URL links -->

<!-- [appveyor-image]: https://ci.appveyor.com/api/projects/status/.../branch/master?svg=true -->
<!-- [coverage-image]: https://img.shields.io/coveralls/github/rivy/os-paths/master.svg -->
<!-- [coverage-url]: https://coveralls.io/github/rivy/os-paths -->
<!-- [nodejsv-image]: https://img.shields.io/node/v/os-paths.svg?style=flat&color=darkcyan -->
<!-- [npm-image]: https://img.shields.io/npm/v/os-paths.svg?style=flat -->
<!-- [npm-image]: https://img.shields.io/npm/v/os-paths.svg?style=flat&label=npm&logo=NPM&logoColor=linen -->
<!-- [npm-url]: https://npmjs.org/package/os-paths -->
<!-- [repository-image]:https://img.shields.io/badge/%E2%9D%A4-darkcyan?style=flat&logo=github -->
<!-- [repository-image]:https://img.shields.io/github/v/tag/rivy/js.os-paths?label=%e2%80%8b&logo=github&logoColor=white&colorA=gray&logoWidth=15 -->
<!-- [scrutinizer-image]: https://img.shields.io/scrutinizer/quality/g/rivy/js.os-paths?label=scritunizer -->
<!-- [scrutinizer-url]: https://scrutinizer-ci.com/g/rivy/js.os-paths -->
<!-- [style-image]: https://img.shields.io/badge/code_style-XO-darkcyan.svg -->
<!-- [style-image]: https://img.shields.io/badge/code_style-standard-darkcyan.svg -->
<!-- [style-url]: https://github.com/xojs/xo -->
<!-- [style-url]: https://standardjs.com -->
<!-- [travis-image]: https://img.shields.io/travis/rivy/js.os-paths/master.svg?style=flat&logo=Travis-CI&logoColor=silver -->
<!-- [travis-image]: https://travis-ci.org/rivy/js.os-paths.svg?branch=master -->
