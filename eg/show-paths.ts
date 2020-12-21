// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

import osPaths from '../src/lib';

console.log({ osPaths });

Object.keys(osPaths).forEach((key) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const value = (osPaths as any)[key]();
	console.log({ key, value });
});

// eslint-disable-next-line functional/immutable-data
process.env.TMPDIR = process.env.TEMP = process.env.TMP = 'temp';
Object.keys(osPaths).forEach((key) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const value = (osPaths as any)[key]();
	console.log({ key, value });
});
