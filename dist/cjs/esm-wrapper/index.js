/* eslint-env node */
// # spell-checker:ignore Deno

import _ from '../index.js';
// note: not usable by `deno`;
//   ...`deno` is unable to load (the CJS module) '../index.js' via import => `'../index.js' does not provide an export named 'default'`

const default_ = _;
export default default_;
