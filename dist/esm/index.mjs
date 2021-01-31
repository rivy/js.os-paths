import { Adapt } from './lib/OSPaths.mjs';
import { adapter } from './platform-adapters/node.mjs';

var default_ = Adapt(adapter).OSPaths;
var haveModuleExports_ = typeof module === 'object' && module.exports;
if (haveModuleExports_) {
    module.exports = default_;
}

export default default_;
