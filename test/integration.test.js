/* eslint-env es6, node */
// spell-checker:ignore (modules) execa
'use strict';

const fs = require('fs');
const path = require('path');

const test = require('ava');
const spawn = require('cross-spawn');

const module_ = require('../build/umd');

// Integration tests

test('api', (t) => {
	const paths = module_;
	const api = ['home', 'temp'];

	t.is(typeof paths, 'function');
	t.is(Object.keys(paths).length, api.length);
	api.forEach((key) => {
		t.is(typeof paths[key], 'function');
	});
});

test('examples are executable without error (JavaScript)', (t) => {
	const egDirPath = 'eg';
	const extensions = ['.js', '.cjs', '.mjs'];

	const files = fs.readdirSync(egDirPath);

	files
		.filter((file) => {
			return extensions.includes(path.extname(file));
		})
		.forEach((file) => {
			const command = 'node';
			const script = path.join(egDirPath, file);
			const args = [script];
			const options = { shell: true, encoding: 'utf8' };

			t.log({ script });

			const { error, status, stdout } = spawn.sync(command, args, options);

			t.log({ error, status, stdout });

			t.deepEqual({ error, status }, { error: null, status: 0 });
		});
});
