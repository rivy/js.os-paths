// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const pkg = require('../' + 'package.json');

const osPaths = require('../' + pkg.main);

console.log({ osPaths });

Object.keys(osPaths).forEach((key) => {
	const value = osPaths[key]();
	console.log({ key, value });
});

// eslint-disable-next-line functional/immutable-data
process.env.TMPDIR = process.env.TEMP = process.env.TMP = 'temp';
Object.keys(osPaths).forEach((key) => {
	const value = osPaths[key]();
	console.log({ key, value });
});
