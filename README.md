<!DOCTYPE markdown><!-- markdownlint-disable no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- markdownlint-disable heading-increment -->
<!-- spell-checker:ignore (abbrev/jargon) CICD CJS ESM ESMs -->
<!-- spell-checker:ignore (names) Codacy Deno -->
<!-- spell-checker:ignore (targets) realclean -->
<!-- spell-checker:ignore (people) rivy sindresorhus Sindre Sorhus -->

# [os-paths](https://github.com/rivy/js.os-paths)

> Generate portable common OS paths (home, temp, ...)

[![Build status (GHA)][gha-image]][gha-url]
[![Build status (Travis-CI)][travis-image]][travis-url]
[![Build status (AppVeyor)][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Style Guide][style-image]][style-url]
&nbsp; <br/>
[![Repository][repository-image]][repository-url]
[![NPM version][npm-image]][npm-url]
[![NodeJS version][nodejsv-image]][repository-url]
[![Downloads][downloads-image]][downloads-url]

## Installation

```shell
npm install os-paths
# or... `npm install github:rivy/js.os-paths`
# or... `npm install "https://cdn.jsdelivr.net/gh/rivy/js.os-paths@latest/dist/os-paths.tgz"`
```

> #### Requirements
>
> NodeJS >= 6.0[^*]

<!--{blockquote: .--info style="font-size:75%;"}-->

[^*]: With the conversion to a TypeScript-based project, due to tooling constraints, testing is more difficult and more limited on Node platforms earlier than Node-v10+. However, the generated CommonJS/UMD project code is still fully compatible with Node-v6+.

## Usage

```js
const osPaths = require('os-paths');

osPaths.home();
//(*nix) => '/home/rivy'
//(win)  => 'C:\Users\rivy'

osPaths.temp();
//(*nix) => '/tmp'
//(win)  => 'C:\Windows\temp'
```

## API

### Initialization

#### `require('os-paths'): OSPaths()`

```js
const osPaths = require('os-paths');
```

The object returned by the module constructor is a function object, `OSPaths`, augmented with attached methods. When this object is called directly (eg, `const p = osPaths()`), it returns another newly constructed `OSPaths` object. Since the `OSPaths` object contains no instance state, all constructed objects will be functionally identical.

### Methods

All module methods return simple, platform-compatible, path strings which are normalized and have no trailing path separators.

The path strings are _not_ guaranteed to already exist on the file system. So, the user is responsible for directory construction, if/when needed. However, since all of these are _standard_ OS directories, they should all exist without the need for user intervention.

If/when necessary, [`make-dir`](https://www.npmjs.com/package/make-dir) or [`mkdirp`](https://www.npmjs.com/package/mkdirp) can be used to create the directories.

#### `osPaths.home(): string | undefined`

- Returns the home directory for user (or `undefined`)

`undefined` is returned if the home directory is not resolvable.

#### `osPaths.temp(): string`

- Returns the directory for temporary files

_Always_ returns a non-empty path (as sanely as possible).

## Discussion

### XDG

All XDG-related methods have been relocated to the [`xdg-portable`](https://www.npmjs.com/package/xdg-portable) and [`xdg-app-paths`](https://www.npmjs.com/package/xdg-app-paths) modules.

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
[![Quality status (Scrutinizer)][scrutinizer-image]][scrutinizer-url]

### Build requirements

- NodeJS >= 6.0
- a JavaScript package/project manager ([`npm`](https://www.npmjs.com/get-npm) or [`yarn`](https://yarnpkg.com))

> #### optional
>
> - [`git-changelog`](https://github.com/rivy-go/git-changelog) ... enables changelog automation

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
update              update/prepare for distribution
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

[MIT](./LICENSE) © [Roy Ivy III](https://github.com/rivy), [Sindre Sorhus](https://sindresorhus.com)

<!-- badge references -->

<!-- Repository -->
<!-- Note: for '[repository-image] ...', `%E2%81%A3` == utf-8 sequence of "Unicode Character 'INVISIBLE SEPARATOR' (U+2063)"; ref: <https://codepoints.net/U+2063> -->

[repository-image]: https://img.shields.io/github/package-json/v/rivy/js.os-paths/master?label=%E2%81%A3&logo=github&logoColor=white
[repository-url]: https://github.com/rivy/js.os-paths
[license-image]: https://img.shields.io/npm/l/os-paths.svg?color=royalblue&style=flat
[license-url]: license
[nodejsv-image]: https://img.shields.io/node/v/os-paths?color=blue
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
[scrutinizer-image]: https://img.shields.io/scrutinizer/quality/g/rivy/js.os-paths?label=scritunizer
[scrutinizer-url]: https://scrutinizer-ci.com/g/rivy/js.os-paths

<!-- Distributors/Registries -->

[npm-image]: https://img.shields.io/npm/v/os-paths.svg?style=flat
[npm-url]: https://npmjs.org/package/os-paths
[downloads-image]: http://img.shields.io/npm/dm/os-paths.svg?style=flat
[downloads-url]: https://npmjs.org/package/os-paths

<!-- Alternate/Old image/URL links -->

<!-- [appveyor-image]: https://ci.appveyor.com/api/projects/status/.../branch/master?svg=true -->
<!-- [coverage-image]: https://img.shields.io/coveralls/github/rivy/os-paths/master.svg -->
<!-- [coverage-url]: https://coveralls.io/github/rivy/os-paths -->
<!-- [node-image]: https://img.shields.io/node/v/os-paths.svg?style=flat&color=darkcyan -->
<!-- [node-url]: https://npmjs.org/package/os-paths -->
<!-- [npm-image]: https://img.shields.io/npm/v/os-paths.svg?style=flat -->
<!-- [npm-image]: https://img.shields.io/npm/v/os-paths.svg?style=flat&label=npm&logo=NPM&logoColor=linen -->
<!-- [npm-url]: https://npmjs.org/package/os-paths -->
<!-- [repository-image]:https://img.shields.io/badge/%E2%9D%A4-darkcyan?style=flat&logo=github -->
<!-- [repository-image]:https://img.shields.io/github/v/tag/rivy/js.os-paths?label=%e2%80%8b&logo=github&logoColor=white&colorA=gray&logoWidth=15 -->
<!-- [style-image]: https://img.shields.io/badge/code_style-XO-darkcyan.svg -->
<!-- [style-image]: https://img.shields.io/badge/code_style-standard-darkcyan.svg -->
<!-- [style-url]: https://github.com/xojs/xo -->
<!-- [style-url]: https://standardjs.com -->
<!-- [travis-image]: https://img.shields.io/travis/rivy/js.os-paths/master.svg?style=flat&logo=Travis-CI&logoColor=silver -->
<!-- [travis-image]: https://travis-ci.org/rivy/js.os-paths.svg?branch=master -->
