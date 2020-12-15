// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const osPaths = require('..');

console.log({ osPaths });

Object.keys(osPaths).forEach((key) => {
	const value = osPaths[key]();
	console.log({ key, value });
});

process.env.TMPDIR = process.env.TEMP = process.TMP = 'temp';
Object.keys(osPaths).forEach((key) => {
	const value = osPaths[key]();
	console.log({ key, value });
});
