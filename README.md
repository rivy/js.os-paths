<!DOCTYPE markdown><!-- markdownlint-disable no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- markdownlint-disable heading-increment -->
<!-- spell-checker:ignore (names) rivy Sindre sindresorhus Sorhus -->
<!-- spell-checker:ignore (abbrev/jargon) CICD -->

# [os-paths](https://github.com/rivy/js.os-paths)

> Generate portable common OS paths (home and temp)

[![Build status][gha-image]][gha-url]
[![Build status][travis-image]][travis-url]
[![Build status][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Javascript Style Guide][style-image]][style-url]
&nbsp; <br/>
[![Repository][repository-image]][repository-url]
[![NPM version][npm-image]][npm-url]
[![NodeJS version][nodejsv-image]][repository-url]
[![Downloads][downloads-image]][downloads-url]

## Installation

```shell
npm install os-paths
```

> #### Requirements
>
> NodeJS >= 6.0

<!--{blockquote: .--info style="font-size:75%;"}-->

## Usage

```js
const osPaths = require('os-paths');

osPaths.home();
//(*nix) => '/home/rivy'
//(win)  => 'C:\Users\RIvy'

osPaths.temp();
//(*nix) => '/tmp'
//(win)  => 'C:\temp'
```

## API

### Initialization

#### `require('os-paths'): OSPaths()`

```js
const osPaths = require('os-paths');
```

The object returned by the module constructor is an `OSPaths` function object, augmented with attached methods. When called directly (eg, `const p = osPaths()`), it returns a newly constructed `OSPaths` object. Since the `OSPaths` object contains no instance state, all constructed objects will be functionally identical.

### Methods

All module methods return simple, platform-compatible, path strings.

The path strings are _not_ guaranteed to already exist on the file system. So, the user is responsible for directory construction, if/when needed.
However, since all of these are _standard_ OS directories, they should all exist without the need for user intervention.

If/when necessary, [`make-dir`](https://www.npmjs.com/package/make-dir) or [`mkdirp`](https://www.npmjs.com/package/mkdirp) can be used to create the directories.

#### `osPaths.home(): string`

Returns the home directory for user

#### `osPaths.temp(): string`

Returns the directory for temporary files

### XDG

All XDG-related methods have been relocated to the [`xdg-portable`](https://www.npmjs.com/package/xdg-portable) and [`xdg-app-paths`](https://www.npmjs.com/package/xdg-app-paths) modules.

## Related

- [`xdg-app-paths`](https://www.npmjs.com/package/xdg-app-paths) ... easy XDG for applications
- [`xdg-portable`](https://www.npmjs.com/package/xdg-portable) ... XDG Base Directory paths (cross-platform)

## License

MIT © [Roy Ivy III](https://github.com/rivy), [Sindre Sorhus](https://sindresorhus.com)

<!-- badge references -->

<!-- Repository -->
<!-- Note: for '[repository-image] ...', `%E2%81%A3` == utf-8 sequence of "Unicode Character 'INVISIBLE SEPARATOR' (U+2063)"; ref: <https://codepoints.net/U+2063> -->

[repository-image]: https://img.shields.io/github/v/tag/rivy/js.os-paths?label=%E2%81%A3&logo=github&logoColor=white
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
