/* eslint-env es6, node */
// # spell-checker:ignore UserProfile
'use strict';

const os = require('os');

const test = require('ava');

const osPaths = require('../src/lib');

test('default', (t) => {
	const paths = osPaths();

	process.env.HOME = process.env.USERPROFILE = 'home';
	process.env.TMPDIR = process.env.TEMP = process.env.TEMP = 'temp';

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
	process.env.HOME = process.env.USERPROFILE = 'home';
	t.is(paths.home(), 'home');
});

test('no os.homedir/os.tmpdir', (t) => {
	os.homedir = null;
	os.tmpdir = null;
	const paths = osPaths();
	process.env.HOME = process.env.USERPROFILE = 'home';
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp';
	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});

test('no os.homedir/os.tmpdir and trailing slash in source', (t) => {
	os.homedir = null;
	os.tmpdir = null;
	const paths = osPaths();
	process.env.HOME = process.env.USERPROFILE = 'home/';
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp/';
	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});
