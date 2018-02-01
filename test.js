'use strict';

const {join} = require('path');
const {mkdir, writeFile} = require('fs');
const {promisify} = require('util');

const listDirectories = require('.');
const rmfr = require('rmfr');
const test = require('tape');

const promisifiedMkdir = promisify(mkdir);
const promisifiedWriteFile = promisify(writeFile);

test('listDirectories()', async t => {
	const tmp = join(__dirname, 'tmp');

	await rmfr(tmp);
	await promisifiedMkdir(tmp);
	await Promise.all([
		promisifiedWriteFile(join(tmp, 'non-directory'), ''),
		promisifiedMkdir(join(tmp, '2')),
		promisifiedMkdir(join(tmp, '10'))
	]);

	const files = await listDirectories(Buffer.from(tmp), {numeric: true});

	t.ok(files instanceof Set, 'should be fulfilled with a Set instance.');
	t.deepEqual([...files], [
		'2',
		'10'
	].map(path => join(tmp, path)), 'should list directories in a given directory.');

	const fail = t.fail.bind(t, 'Unexpectedly succeeded.');

	try {
		await listDirectories('not-found');
		fail();
	} catch ({code}) {
		t.equal(code, 'ENOENT', 'should fail when it cannot find the directory.');
	}

	try {
		await listDirectories([0, 1]);
		fail();
	} catch ({name}) {
		t.equal(name, 'TypeError', 'should fail when it takes a non-string argument.');
	}

	try {
		await listDirectories();
		fail();
	} catch (err) {
		t.equal(
			err.toString(),
			'TypeError: Expected 1 or 2 arguments (path: <string|Buffer|URL>[, options: <Object>]), but got no arguments.',
			'should fail when it takes no arguments.'
		);
	}

	try {
		await listDirectories('a', {}, 'b');
		fail();
	} catch (err) {
		t.strictEqual(
			err.toString(),
			'TypeError: Expected 1 or 2 arguments (path: <string|Buffer|URL>[, options: <Object>]), but got 3 arguments.',
			'should fail when it takes too many arguments.'
		);
	}

	t.end();
});
