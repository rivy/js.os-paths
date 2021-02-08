/* eslint-env es6, node */
'use strict';

import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const pkg = JSON.parse(
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	fs.readFileSync(new URL(path.join('..', 'package.json'), import.meta.url), 'utf8')
);

const moduleURL = new URL(path.join('..', pkg.module), import.meta.url);

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

(async function main() {
	const osPaths = (await import(moduleURL)).default;

	console.log({ osPaths });
	console.log(objectEntries(osPaths));

	process.env.TMPDIR = process.env.TEMP = process.env.TMP = 'temp';
	console.log(objectEntries(osPaths));
})();

/* eslint-enable no-console , functional/immutable-data , security/detect-object-injection, security-node/detect-crlf */
