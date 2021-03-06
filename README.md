# list-directories

[![npm version](https://img.shields.io/npm/v/list-directories.svg)](https://www.npmjs.com/package/list-directories)
[![Build Status](https://travis-ci.org/shinnn/list-directories.svg?branch=master)](https://travis-ci.org/shinnn/list-directories)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/list-directories.svg)](https://coveralls.io/github/shinnn/list-directories?branch=master)

List all directories in a given directory

```javascript
const listDirectories = require('list-directories');

/*
  ./my-dir/a: file
  ./my-dir/b: directory
  ./my-dir/c: symlink to a directory
  ./my-dir/d: directory
*/

(async () => {
  await listDirectories('my-dir');
  /* => Set {
    '/Users/example/my-dir/b',
    '/Users/example/my-dir/d'
  } */
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install list-directories
```

## API

```javascript
const listDirectories = require('list-directories');
```

### listDirectories(*dir*)

*dir*: `string` `Buffer` `URL` (directory path)  
*options*: `Object` ([`readdir-sorted`](https://github.com/shinnn/readdir-sorted) options)  
Return: `Promise<Set<string>>`

The promise will be fulfilled with a [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set) of strings — absolute paths of all directories included in the given directory.

Options are directly passed to the underlying [`readdir-sorted`](https://github.com/shinnn/readdir-sorted#readdirsortedpath--options) to control the order of results.

```javascript
listDirectories('/dirs').then(files => {
  const iterator = files[Symbol.iterator];

  iterator.next().value; //=> '/dirs/10'
  iterator.next().value; //=> '/dirs/2a'
  iterator.next().value; //=> '/dirs/2A'
});

listDirectories('/dirs', {
  numeric: true,
  caseFirst: 'upper'
}).then(files => {
  const iterator = files[Symbol.iterator];

  iterator.next().value; //=> '/dirs/2A'
  iterator.next().value; //=> '/dirs/2a'
  iterator.next().value; //=> '/dirs/10'
});
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
