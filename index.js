'use strict';

const lstatDir = require('lstat-dir');

function filterDirectories(map) {
  const directoryPaths = new Set();

  for (const [path, stat] of map) {
    if (stat.isDirectory()) {
      directoryPaths.add(path);
    }
  }

  return directoryPaths;
}

module.exports = function listDirectories(...args) {
  const argLen = args.length;

  if (argLen !== 1 && argLen !== 2) {
    return Promise.reject(new RangeError(`Expected 1 or 2 arguments (<string>[, <Object>]), but got ${
      argLen === 0 ? 'no' : argLen
    } arguments.`));
  }

  return lstatDir(args[0]).then(filterDirectories);
};
