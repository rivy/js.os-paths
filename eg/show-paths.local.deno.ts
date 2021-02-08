/* eslint-env es6, deno */
// # spell-checker:ignore Deno

/* eslint-disable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../src/types/deno.d.ts'/>

// @ts-ignore
import osPaths from '../src/mod.deno.ts';

// create a local reference to refer to `Deno` (for better linting without need for multiple `// @ts-ignore` directives)
// @ts-ignore
const deno = Deno;

function objectEntries(obj: any) {
	const map: any = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		const val = typeof value === 'function' ? value() : value;
		map[key] = val;
	});
	return map;
}

function stringifyConverter(_key: any, val: any) {
	if (typeof val === 'function') {
		/* eslint-disable functional/no-let */
		let p = '[Function: ' + val.name + ']';
		let s = '';
		let m = '';
		Object.keys(val).forEach((k) => {
			if (m === '') {
				p += ' { ';
				s += ' }';
			} else m += ', ';
			m += k + ': ' + JSON.stringify(val[k], stringifyConverter);
		});
		return p + m + s;
		/* eslint-enable functional/no-let */
	}
	return val;
}

console.log({ osPaths });
console.log({ osPaths: JSON.parse(JSON.stringify(osPaths, stringifyConverter)) }); // custom output; // maint:[2020-01-30; rivy] await resolution of <https://github.com/denoland/deno/issues/9333> by <https://github.com/denoland/deno/pull/9363>
console.log(objectEntries(osPaths));
console.log('home() =', osPaths.home());
console.log('temp() =', osPaths.temp());

deno.env.set('TEMP', 'temp');
deno.env.set('TMPDIR', 'tmpdir');
deno.env.set('TMP', 'tmp');
console.log(objectEntries(osPaths));

deno.env.set('TEMP', 'NEW');
console.log(objectEntries(osPaths));

/* eslint-enable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any */
