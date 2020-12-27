/* eslint-env es6, node */
// spell-checker:ignore (modules) Deno ESM ESMs execa
'use strict';

const fs = require('fs');
const path = require('path');

const test = require('ava');
const spawn = require('cross-spawn');

const module_ = require('../build/cjs+tests');

const vNodeJS = process.versions.node.split('.');
const vNodeJS_Major = +vNodeJS[0];
const vNodeJS_minor = +vNodeJS[1];

// removal of `--experimental-modules` flag gate for ESM
// ref: [NodeJS-v12.17 changes]<https://github.com/nodejs/node/pull/33197>
// ref: [NodeJS-v13.2 changes]<https://github.com/nodejs/node/pull/30547>
const settledSupportForESMs =
	vNodeJS_Major > 13 ||
	(vNodeJS_Major == 13 && vNodeJS_minor >= 2) ||
	(vNodeJS_Major == 12 && vNodeJS_minor >= 17);

// Integration tests

test('api', (t) => {
	const api = ['home', 'temp'];

	t.is(typeof module_, 'function');
	t.deepEqual(Object.keys(module_).sort(), api.sort());
	api.forEach((key) => {
		t.is(typeof module_[key], 'function');
	});
});

// ToDO: add Deno example script checks

test('examples are executable without error (JavaScript)', (t) => {
	const egDirPath = 'eg';
	const extensions = ['.js', '.cjs', '.mjs'];

	const files = fs.readdirSync(egDirPath);

	files
		.filter((file) => {
			return extensions.includes(path.extname(file));
		})
		.forEach((file) => {
			if (settledSupportForESMs || path.extname(file) === '.js') {
				const command = 'node';
				const script = path.join(egDirPath, file);
				const args = [script];
				const options = { shell: true, encoding: 'utf-8' };

				t.log({ script });

				const { error, status, stdout } = spawn.sync(command, args, options);

				t.log({ error, status, stdout });

				t.deepEqual({ error, status }, { error: null, status: 0 });
			}
		});
});

test('examples are executable without error (TypeScript)', (t) => {
	const egDirPath = 'eg';
	const extensions = ['.ts'];

	const files = fs.readdirSync(egDirPath);

	files
		.filter((file) => {
			return extensions.includes(path.extname(file));
		})
		.forEach((file) => {
			const command = 'node';
			const script = path.join(egDirPath, file);
			const args = ['node_modules/ts-node/dist/bin.js', script];
			const options = { shell: true, encoding: 'utf8' };

			t.log({ script });

			const { error, status, stdout } = spawn.sync(command, args, options);

			t.log({ error, status, stdout });

			t.deepEqual({ error, status }, { error: null, status: 0 });
		});
});
