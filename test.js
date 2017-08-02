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
  t.plan(5);

  const tmp = join(__dirname, 'tmp');

  await rmfr(tmp);
  await promisifiedMkdir(tmp);
  await Promise.all([
    promisifiedWriteFile(join(tmp, 'non-directory'), ''),
    promisifiedMkdir(join(tmp, '10'))
  ]);

  listDirectories(tmp, {numeric: true}).then(files => {
    t.ok(files instanceof Set, 'should be fulfilled with a Set instance.');

    t.deepEqual([...files], [
      // '2',
      '10'
    ].map(path => join(tmp, path)), 'should list directories in a given directory.');
  }).catch(t.fail);

  listDirectories('not-found').catch(err => {
    t.strictEqual(err.code, 'ENOENT', 'should fail when it cannot find the directory.');
  });

  listDirectories([0, 1]).catch(err => {
    t.strictEqual(
      err.toString(),
      'TypeError: Expected a path of the directory (string), but got a non-string value [ 0, 1 ].',
      'should fail when it takes a non-string argument.'
    );
  });

  listDirectories().catch(err => {
    t.strictEqual(
      err.toString(),
      'TypeError: Expected a path of the directory (string), but got a non-string value undefined.',
      'should fail when it takes no arguments.'
    );
  });

  /*
  listDirectories('a', {}, 'b').catch(err => {
    t.strictEqual(
      err.toString(),
      'TypeError: Expected 1 or 2 arguments (path: String[, options: Object]), but got 3 arguments.',
      'should fail when it takes too many arguments.'
    );
  });
  */
});
