import test from 'ava';

import module_ from '..';

type moduleInternals_ = typeof module_ & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly [index: string]: (_dirOptions?: any) => any;
};

test('api', (t) => {
	const paths = module_;
	const api = ['home', 'temp'];

	t.is(typeof paths, 'function');
	t.is(Object.keys(paths).length, api.length);
	api.forEach((key) => {
		t.is(typeof (paths as moduleInternals_)[key], 'function');
	});
});
