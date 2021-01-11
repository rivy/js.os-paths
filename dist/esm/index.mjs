import { OSPathsAdaptionBuilder_ } from './lib/OSPaths.mjs';
import { adapter } from './platform-adapters/node.mjs';

var default_ = OSPathsAdaptionBuilder_(adapter);
var haveModuleExports_ = typeof module === 'object' && module.exports;
if (haveModuleExports_) {
    module.exports = default_;
}

export default default_;
