// spell-checker:ignore Deno

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../types/deno.d.ts"/>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as path from 'https://deno.land/std@0.81.0/path/mod.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Platform } from './_base.ts';

export const adapter: Platform.Adapter = {
	env: { get: Deno.env.get },
	// Deno (as of v1.6) has no built-in implementation for homedir() or tmpdir()
	os: {}, // * module is tolerant of missing homedir()/tmpdir() functions
	path,
	process: { platform: Deno.build.os },
};
