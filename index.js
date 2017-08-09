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
  return lstatDir(...args).then(filterDirectories);
};
