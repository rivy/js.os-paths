// spell-checker:ignore maint rivy
import { Adapt, OSPaths } from './lib/OSPaths';
import { adapter } from './platform-adapters/node';

const default_: OSPaths = Adapt(adapter).OSPaths;

export type { OSPaths };
export default default_;

const haveModuleExports_ = typeof module === 'object' && module.exports;
// ## maint ~ [2020-12-23; rivy] `else` clause *is* tested, but coverage is not visible via `nyc` (currently unable to instrument ESM/.mjs correctly)
/* istanbul ignore else */
if (haveModuleExports_) {
	// enables direct require from CJS (eg, `const module = require('...');`), but generally disables any other exports
	// * skipped for ESM (missing `module.exports`)
	// * added non-enumerable '_esm!' property (as a hack) to allow full access to all exports (for testing, ...)
	// eslint-disable-next-line functional/immutable-data
	module.exports = default_;
	// add a non-enumerable '_esm!' property (really a hack) to allow full access to all exports (for testing, ...)
	Object.defineProperty(module.exports, '_esm!', {
		get() {
			return exports;
		},
		enumerable: false,
	});
}
