/* eslint-env es6, deno */
// # spell-checker:ignore Deno

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../src/types/deno.d.ts'/>

// @ts-ignore
import osPaths from '../src/mod.deno.ts';

// create a local reference to refer to `Deno` (for better linting without need for multiple `// @ts-ignore` directives)
// @ts-ignore
const deno = Deno;

console.log({ osPaths });

Object.keys(osPaths).forEach((key) => {
	const value = (osPaths as any)[key]();
	console.log({ key, value });
});

deno.env.set('TEMP', 'temp');
deno.env.set('TMPDIR', 'tmpdir');
deno.env.set('TMP', 'tmp');
Object.keys(osPaths).forEach((key) => {
	const value = (osPaths as any)[key]();
	console.log({ key, value });
});

deno.env.set('TEMP', 'NEW');
Object.keys(osPaths).forEach((key) => {
	const value = (osPaths as any)[key]();
	console.log({ key, value });
});

/* eslint-enable no-console , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any */
