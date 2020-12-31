import test from 'ava';

import module_ from '..';

type moduleInternals_ = typeof module_ & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly [index: string]: any;
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
