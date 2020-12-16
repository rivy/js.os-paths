// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

const osPaths = require('..');

console.log({ osPaths });

Object.entries(osPaths).forEach((entry) => {
	const [key, fn] = entry;
	const value = fn();
	console.log({ key, value });
});

process.env.TMPDIR = process.env.TEMP = process.TMP = 'temp';
Object.entries(osPaths).forEach((entry) => {
	const [key, fn] = entry;
	const value = fn();
	console.log({ key, value });
});
