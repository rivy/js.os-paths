/* eslint-env es6, deno */
// # spell-checker:ignore Deno

/* eslint-disable no-console , security/detect-object-injection, security-node/detect-crlf , @typescript-eslint/ban-ts-comment , @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../src/types/deno.d.ts"/>

// @ts-ignore
import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths@5b6b93bdb048098b86f9b8f0952180c2bf0532b1/src/mod.deno.ts';
// import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths@2d5924e692617a575c8a73c9fb611e93085c4339/src/mod.deno.ts';
// import osPaths from 'https://cdn.jsdelivr.net/gh/rivy/js.os-paths@latest/src/mod.deno.ts';

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
