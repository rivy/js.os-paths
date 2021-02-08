import { Adapt } from './lib/OSPaths.js';
import { adapter } from './platform-adapters/node.js';

const _ = Adapt(adapter).OSPaths;

export = _;
