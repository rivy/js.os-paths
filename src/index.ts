// spell-checker:ignore maint rivy
import { default as default_ } from './lib/OSPaths';

export * from './lib/OSPaths';

export default default_;

const haveModuleExports_ = typeof module === 'object' && module.exports;
// ## maint ~ [2020-12-23; rivy] although tested, `nyc` is unable to instrument ESM/.mjs correctly in order show coverage for testing the *else* clause
/* istanbul ignore else */
if (haveModuleExports_) {
	// enables direct require from CJS (eg, `const module = require('...');`), but generally disables any other exports
	// * skipped for ESM (missing `module.exports`)
	// eslint-disable-next-line functional/immutable-data
	module.exports = default_;
}
