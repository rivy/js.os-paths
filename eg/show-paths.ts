import osPaths from '../src';

/* eslint-disable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function objectEntries(obj: any) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/* eslint-enable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf */
