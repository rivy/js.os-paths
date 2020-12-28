/* eslint-env es6, node */
'use strict';

const osPaths = require('../build/cjs/index.js');

function objectEntries(obj) {
	const map = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		// eslint-disable-next-line functional/immutable-data
		map[key] = val;
	});
	return map;
}

console.log({ osPaths });
console.log(objectEntries(osPaths));

// eslint-disable-next-line functional/immutable-data
process.env.TMPDIR = process.env.TEMP = process.env.TMP = 'temp';
console.log(objectEntries(osPaths));
