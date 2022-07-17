module.exports = {
	// $schema: 'http://json.schemastore.org/prettierrc',
	printWidth: 100,
	proseWrap: 'preserve',
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	// ## overrides/[*.markdown]/tabWidth": "// set this to 4 when/if https://github.com/prettier/prettier/issues/5019 is fixed",
	overrides: [{ files: ['*.md', '*.mkd', '*.markdown'], options: { tabWidth: 2, useTabs: false } }],
};
