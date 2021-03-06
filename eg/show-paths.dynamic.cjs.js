/* eslint-env es6, node */
'use strict';

// eslint-disable-next-line security-node/detect-non-literal-require-calls , security/detect-non-literal-require
const osPaths = require('../' + require('../package.json').main);

/* eslint-disable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf */

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
console.log('home() =', osPaths.home());
console.log('temp() =', osPaths.temp());

process.env.TMPDIR = process.env.TEMP = process.env.TMP = 'temp';
console.log(objectEntries(osPaths));

/* eslint-enable no-console, functional/immutable-data , security/detect-object-injection , security-node/detect-crlf */
