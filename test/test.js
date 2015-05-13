'use strict';
//var assert = require('assert');
var Euler = require('../');
//var fs = require('fs');

process.chdir(__dirname);

describe('projecteuler-init node module', function () {
  it('fixture', function (next) {
    new Euler(1, 'python', '.py');
  });
});
