/* eslint-env node */
// # spell-checker:ignore Deno

import _ from '../index.js';
// note: not usable by `deno`;
//   ...`deno` is unable to load (the CJS module) '../index.js' via import => `'../index.js' does not provide an export named 'default'`
import { adapter } from '../platform-adapters/node.js';

// re-define `meta.mainFilename` adapter for ESM scripts
// HACK: `process._eval` is undocumented; used here as evidence of `node -e ...` differentiating between immediate eval vs file-bound scripts
// eslint-disable-next-line functional/immutable-data
adapter.meta.mainFilename = typeof process._eval === 'undefined' ? process.argv[1] : '';

const default_ = _;
export default default_;
