'use strict';

const lstatDir = require('lstat-dir');

function filterDirectories(map) {
  const directoryPaths = new Set();

  for (const pathStatPair of map) {
    if (pathStatPair[1].isDirectory()) {
      directoryPaths.add(pathStatPair[0]);
    }
  }

  return directoryPaths;
}

module.exports = function listEmptyFiles(dir) {
  return lstatDir(dir).then(filterDirectories);
};
