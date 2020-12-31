/* eslint-env es6, node */
'use strict';

const osPaths = require('../build/cjs/index.js');

/* eslint-disable functional/immutable-data , security/detect-object-injection, security-node/detect-crlf */

function objectEntries(obj) {
	const map = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		map[key] = val;
	});
	return map;
}

console.log({ osPaths });
console.log(objectEntries(osPaths));

process.env.TMPDIR = process.env.TEMP = process.env.TMP = 'temp';
console.log(objectEntries(osPaths));

/* eslint-enable functional/immutable-data , security/detect-object-injection , security-node/detect-crlf */
