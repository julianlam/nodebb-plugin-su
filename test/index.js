/**
 * Run with `npx mocha test/plugins-installed.js` from the NodeBB root.
 * Add "nodebb-plugin-su" to config.json `test_plugins` to include in the run.
 */

'use strict';

/* globals describe, it, before */

const assert = require('assert');
const db = require.main.require('./test/mocks/databasemock');

describe('nodebb-plugin-su', () => {
	before(() => {
		// Prepare for tests here
	});

	it('should load config object', async () => {
		const config = await db.getObject('config');
		assert(config);
	});
});
