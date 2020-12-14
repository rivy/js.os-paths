import { expectType } from 'tsd';
import osPaths = require('../src/lib');

expectType<typeof osPaths>(osPaths());

expectType<string>(osPaths.home());
expectType<string>(osPaths.temp());
