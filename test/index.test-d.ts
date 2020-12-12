import {expectType} from 'tsd';
import osPaths = require('../src/lib');

const paths: typeof osPaths = osPaths();

expectType<typeof osPaths>(osPaths());

expectType<string>(paths.home());
expectType<string>(paths.temp());
