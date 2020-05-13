#!/usr/bin/env node

'use strict';

var distance = require('jaro-winkler');
var commands = ['open', 'close', 'save', 'revert', 'select', 'copy', 'duplicate', 'add', 'subtract'];
var rated    = [];
var args     = process.argv.slice(2);

commands.forEach(function(command) {
  rated.push({
    command: command,
    distance: distance(args[0], command)
  });
});

rated.sort(function(a, b) {
  if (a.distance < b.distance) {
    return 1;
  } else if (a.distance > b.distance) {
      return -1;
  } else {
    return 0;
  }
});

if (rated[0].distance === 1) {
  console.log("Running " + rated[0].command + "!");
} else {
  console.log("Did you mean " + rated[0].command + "?");
}

process.exit(0);