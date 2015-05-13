#!/usr/bin/env node
'use strict';
var meow = require('meow');
var Euler = require('./');

var cli = meow({
  help: [
    'Usage',
    '  projecteuler-init <problem id> <language> <ext>',
    '',
    'Example',
    '  projecteuler-init 1 python .py',
    ''
  ].join('\n')
});

if (cli.input.length === 3) {
  new Euler(cli.input[0], cli.input[1], cli.input[2]);
} else {
  cli.showHelp();
}
