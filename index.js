'use strict';

const lstatDir = require('lstat-dir');

module.exports = async function listDirectories(...args) {
  const directoryPaths = new Set();

  for (const [path, stat] of await lstatDir(...args)) {
    if (stat.isDirectory()) {
      directoryPaths.add(path);
    }
  }

  return directoryPaths;
};
