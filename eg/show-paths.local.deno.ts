/* eslint-env es6, deno */
// # spell-checker:ignore Deno

/* eslint-disable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../vendor/types/deno.d.ts'/>

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

console.log({ osPaths });
console.log(objectEntries(osPaths));
console.log('home() =', osPaths.home());
console.log('temp() =', osPaths.temp());

const queryEnv = await deno?.permissions?.query({ name: 'env' });
if (queryEnv?.state !== 'granted') {
	console.warn('ERROR: environment permissions are required (try re-run with `--allow-env`)');
	Deno.exit(1);
}

deno.env.set('TEMP', 'temp');
deno.env.set('TMPDIR', 'tmpdir');
deno.env.set('TMP', 'tmp');
console.log(objectEntries(osPaths));

deno.env.set('TEMP', 'NEW');
console.log(objectEntries(osPaths));

/* eslint-enable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any */
