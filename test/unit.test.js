// # spell-checker:ignore UserProfile
/* eslint-env es6, node */
import os from 'os';
import test from 'ava';

import osPaths from '../src/lib';

test('default', (t) => {
	const paths = osPaths();

	process.env.HOME = process.env.USERPROFILE = 'home'; // eslint-disable-line no-multi-assign
	process.env.TMPDIR = process.env.TEMP = process.env.TEMP = 'temp'; // eslint-disable-line no-multi-assign

	for (const key of Object.keys(paths)) {
		const value = paths[key];
		t.log(key, '=', value, '() =>', value());
		const values = [].concat(value()); // # convert value (single value or array) to a flat array
		t.true(
			values.reduce((a, v) => a && v === key, true),
			true
		);
	}
});

test('alternate construction (via function)', (t) => {
	const paths = osPaths();
	process.env.HOME = process.env.USERPROFILE = 'home'; // eslint-disable-line no-multi-assign
	t.is(paths.home(), 'home');
});

test('no os.homedir/os.tmpdir', (t) => {
	os.homedir = null;
	os.tmpdir = null;
	const paths = osPaths();
	process.env.HOME = process.env.USERPROFILE = 'home'; // eslint-disable-line no-multi-assign
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp'; // eslint-disable-line no-multi-assign
	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});

test('no os.homedir/os.tmpdir and trailing slash in source', (t) => {
	os.homedir = null;
	os.tmpdir = null;
	const paths = osPaths();
	process.env.HOME = process.env.USERPROFILE = 'home/'; // eslint-disable-line no-multi-assign
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp/'; // eslint-disable-line no-multi-assign
	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});
