<!DOCTYPE markdown><!-- markdownlint-disable no-inline-html -->
<meta charset="utf-8" content="text/markdown" lang="en">
<!-- -## editors ## (emacs/sublime) -*- coding: utf8-nix; tab-width: 4; mode: markdown; indent-tabs-mode: nil; basic-offset: 2; st-word_wrap: 'true' -*- ## (jEdit) :tabSize=4:indentSize=4:mode=markdown: ## (notepad++) vim:tabstop=4:syntax=markdown:expandtab:smarttab:softtabstop=2 ## modeline (see <https://archive.is/djTUD>@@<http://webcitation.org/66W3EhCAP> ) -->
<!-- spell-checker:ignore expandtab markdownlint modeline smarttab softtabstop -->

<!-- spell-checker:ignore rivy Sindre Sorhus -->

# [os-paths](https://github.com/rivy/js.os-paths)

> Generate portable basic OS paths (home, temp, ...)

[![Build status][travis-image]][travis-url]
[![Build status][appveyor-image]][appveyor-url]
[![Coverage status][coverage-image]][coverage-url]
[![Javascript Style Guide][style-image]][style-url]
[![License][license-image]][license-url]
&nbsp; <br/>
[![Repository][repository-image]][repository-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

## Installation

```shell
npm install os-paths
```

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
// or ...
const osPaths = require('os-paths')( options );
```

The object returned by the module constructor is an OSPaths Function object, augmented with attached methods. When called directly (eg, `const p = xdg()`), it returns a newly constructed OSPaths object. Since the OSPaths object contains no instance state, all constructed objects will be functionally identical.

### Methods

All module methods return platform-compatible path strings.

Note: It only generates the path strings. It doesn't create the directories for you. You could use [`make-dir`](https://github.com/sindresorhus/make-dir) to create the directories.

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

[npm-image]: https://img.shields.io/npm/v/os-paths.svg?style=flat
[npm-url]: https://npmjs.org/package/os-paths

<!-- [appveyor-image]: https://ci.appveyor.com/api/projects/status/.../branch/master?svg=true -->
[appveyor-image]: https://img.shields.io/appveyor/ci/rivy/js-os-paths/master.svg?style=flat&logo=AppVeyor&logoColor=silver
[appveyor-url]: https://ci.appveyor.com/project/rivy/js-os-paths
<!-- [travis-image]: https://travis-ci.org/rivy/js.os-paths.svg?branch=master -->
<!-- [travis-image]: https://img.shields.io/travis/rivy/js.os-paths/master.svg?style=flat&logo=Travis-CI&logoColor=silver -->
[travis-image]: https://img.shields.io/travis/rivy/js.os-paths/master.svg?style=flat
[travis-url]: https://travis-ci.org/rivy/js.os-paths

<!-- [coverage-image]: https://img.shields.io/coveralls/github/rivy/os-paths/master.svg -->
<!-- [coverage-url]: https://coveralls.io/github/rivy/os-paths -->
[coverage-image]: https://img.shields.io/codecov/c/github/rivy/js.os-paths/master.svg
[coverage-url]: https://codecov.io/gh/rivy/js.os-paths
[downloads-image]: http://img.shields.io/npm/dm/os-paths.svg?style=flat
[downloads-url]: https://npmjs.org/package/os-paths
[issues-image]: https://img.shields.io/github/issues/rivy/js.os-paths?logo=github
[issues-url]: https://github.com/rivy/js.os-paths/issues
[license-image]: https://img.shields.io/npm/l/os-paths.svg?style=flat
[license-url]: license
<!-- [repository-image]:https://img.shields.io/badge/%E2%9D%A4-darkcyan?style=flat&logo=github -->
[repository-image]:https://img.shields.io/github/v/tag/rivy/js.os-paths?label=@&logo=github
[repository-url]:https://github.com/rivy/js.os-paths
<!-- [style-image]: https://img.shields.io/badge/code_style-standard-darkcyan.svg -->
<!-- [style-url]: https://standardjs.com -->
[style-image]: https://img.shields.io/badge/code_style-XO-darkcyan.svg
[style-url]: https://github.com/xojs/xo
