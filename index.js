'use strict';

var ES6Set = require('es6-set');
var lstatDir = require('lstat-dir');
var toArray = require('lodash/fp/toArray');

function filterDirectories(map) {
  var directoryPaths = new ES6Set();

  toArray(map).forEach(function(pathStatPair) {
    if (pathStatPair[1].isDirectory()) {
      directoryPaths.add(pathStatPair[0]);
    }
  });

  return directoryPaths;
}

module.exports = function listEmptyFiles(dir) {
  return lstatDir(dir).then(filterDirectories);
};
