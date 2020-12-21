import { expectType } from 'tsd';

import osPaths from '../src';

expectType<typeof osPaths>(osPaths());

expectType<string>(osPaths.home());
expectType<string>(osPaths.temp());
