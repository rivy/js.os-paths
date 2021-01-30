/* eslint-env es6, node */
/* eslint complexity: ['error', { max: 10 }] */ // set maximum cyclomatic complexity to 10; ref: <https://eslint.org/docs/rules/complexity>
// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData SystemDrive SystemRoot UserProfile cyclomatic windir
'use strict';

const os = require('os');
const path = require('path');

const test = require('ava');

const osPaths = require('../build/cjs+tests');

const isWinOS = /^win/i.test(process.platform);

const env = {
	defaults: process.env,
	signalValues: {
		ALLUSERSPROFILE: 'allusersprofile',
		HOME: 'home',
		HOMEDRIVE: 'homedrive',
		HOMEPATH: 'homepath',
		LOCALAPPDATA: 'localappdata',
		SystemRoot: 'systemroot',
		SystemDrive: 'systemdrive',
		TEMP: 'temp',
		TMPDIR: 'tmpdir',
		TMP: 'tmp',
		USERPROFILE: 'userprofile',
		windir: 'windir',
	},
};

const original = {
	env: { ...process.env },
	os: {
		homedir: os.homedir,
		tmpdir: os.tmpdir,
	},
};

function setObjectKeys(object, values) {
	// eslint-disable-next-line functional/immutable-data , security/detect-object-injection
	Object.keys(values).forEach((key) => (object[key] = values[key]));
}

// * reset environment prior to each test
test.beforeEach(() => {
	setObjectKeys(process.env, original.env);
	setObjectKeys(os, original.os);
});

/* eslint-disable no-undefined , functional/immutable-data */

test('default', (t) => {
	const paths = osPaths;

	process.env.HOME = process.env.USERPROFILE = 'home';
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp';

	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});

test('alternate construction (via function)', (t) => {
	const paths = osPaths();

	process.env.HOME = process.env.USERPROFILE = 'home';
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp';

	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});

test('no os.homedir/os.tmpdir', (t) => {
	os.homedir = os.tmpdir = null;

	const paths = osPaths;

	process.env.HOME = process.env.USERPROFILE = 'home';
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp';

	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});

test('no os.homedir/os.tmpdir and trailing slash in environment source', (t) => {
	os.homedir = os.tmpdir = null;

	const paths = osPaths;

	process.env.HOME = process.env.USERPROFILE = 'home/';
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp/';

	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});

test('no os.homedir or environment', (t) => {
	os.homedir = null;

	const paths = osPaths;

	delete process.env.HOME;
	delete process.env.HOMEDRIVE;
	delete process.env.HOMEPATH;
	delete process.env.USERPROFILE;
	t.is(paths.home(), undefined);

	process.env.HOME = process.env.HOMEDRIVE = process.env.HOMEPATH = process.env.USERPROFILE = '';
	t.is(paths.home(), undefined);
});

test('os.homedir/os.tmpdir return `null`', (t) => {
	os.homedir = os.tmpdir = () => null;

	const paths = osPaths;

	process.env.HOME = process.env.USERPROFILE = 'home';
	process.env.TEMP = process.env.TMP = process.env.TMPDIR = 'temp';

	t.is(paths.home(), 'home');
	t.is(paths.temp(), 'temp');
});

test('no os.homedir and runtime variations', (t) => {
	const paths = osPaths;

	process.env.HOME = process.env.HOMEDRIVE = process.env.HOMEPATH = process.env.USERPROFILE = '';

	process.env.HOMEDRIVE = 'homedrive';
	t.is(paths.home(), isWinOS ? 'homedrive' : undefined);

	process.env.HOMEDRIVE = '';
	process.env.HOMEPATH = 'homepath';
	t.is(paths.home(), isWinOS ? 'homepath' : undefined);
	process.env.HOMEDRIVE = 'homedrive';
	t.is(paths.home(), isWinOS ? path.join('homedrive', 'homepath') : undefined);

	process.env.HOME = 'home';
	t.is(paths.home(), 'home');

	process.env.USERPROFILE = 'userprofile';
	t.is(paths.home(), isWinOS ? 'userprofile' : 'home');
});

test('no os.tmpdir and runtime variations', (t) => {
	const paths = osPaths;

	const posixFallback = '/tmp';
	const windowsFallback = 'C:\\Temp';

	process.env.TEMP = process.env.TMPDIR = process.env.TMP = '';

	t.is(paths.temp(), isWinOS ? path.join(process.env.LOCALAPPDATA, 'Temp') : posixFallback);
	process.env.LOCALAPPDATA = '';
	t.is(
		paths.temp(),
		isWinOS ? path.join(paths.home() || '', 'AppData', 'Local', 'Temp') : posixFallback
	);
	process.env.HOME = process.env.HOMEDRIVE = process.env.HOMEPATH = process.env.USERPROFILE = '';
	t.is(paths.temp(), isWinOS ? path.join(process.env.ALLUSERSPROFILE, 'Temp') : posixFallback);
	delete process.env.ALLUSERSPROFILE;
	t.is(paths.temp(), isWinOS ? path.join(process.env.SystemRoot, 'Temp') : posixFallback);
	process.env.SystemRoot = '';
	t.is(paths.temp(), isWinOS ? path.join(process.env.windir, 'Temp') : posixFallback);
	delete process.env.windir;
	t.is(paths.temp(), isWinOS ? path.join(process.env.SystemDrive + '\\', 'Temp') : posixFallback);
	process.env.SystemDrive = '';
	t.is(paths.temp(), isWinOS ? windowsFallback : posixFallback);

	process.env.TMP = 'tmp';
	t.is(paths.temp(), 'tmp');
	process.env.TEMP = 'temp';
	t.is(paths.temp(), 'temp');
	process.env.TMPDIR = 'tmpdir';
	t.is(paths.temp(), isWinOS ? 'temp' : 'tmpdir'); // TMPDIR is not used for Windows platforms
});

/* eslint-enable no-undefined , functional/immutable-data */
