import osPaths from '../dist/cjs/index.js'; // ## maint: [2021-02-07; rivy] await resolution of <https://github.com/TypeStrong/ts-node/issues/783> to return to direct TS import

/* eslint-disable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/no-explicit-any */

function objectEntries(obj: any) {
	const map: any = {};
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

/* eslint-enable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/no-explicit-any*/
