import test from 'ava';

import module_ from '../mod.esm.js';

type moduleInternals_ = typeof module_ & {
	readonly [index: string]: unknown;
};

test('api', (t) => {
	const api = ['home', 'temp'];

	t.is(typeof module_, 'function');
	t.deepEqual(Object.keys(module_).sort(), api.sort());
	api.forEach((key) => {
		// eslint-disable-next-line security/detect-object-injection
		t.is(typeof (module_ as moduleInternals_)[key], 'function');
	});
});
