'use strict';

var path = require('path');
var fs = require('fs');

var mkdirp   = require('mkdirp');
var wordWrap = require('word-wrap');

var got     = require('got');
var cheerio = require('cheerio');

var wrap = function (msg) {
  return wordWrap(msg, { width: 50 });
};

var getProblem = function(id, cb) {
  var url = 'https://projecteuler.net/problem=' + id;
  got(url, function(err, data) {
    var $ = cheerio.load(data);

    var $problem  = $('#content > h2');
    var $name     = $('#problem_info h3');
    var $stats    = $('#problem_info span');
    var $content  = $('.problem_content');

    var stats = wrap($stats.text());

    var desc = wrap($content.text());
    var descItems = desc.replace(/\r/g, '').split('\n');

    var banner = [];
    banner.push('/**');
    banner.push(' * Project Euler: ' + $name.text());
    banner.push(' * ' + $problem.text());
    banner.push(' * '   + url);
    banner.push(' * ');

    for (var descIndex in descItems) {
      var descItem = descItems[descIndex];
      var descText = descItem.replace(/^(\s*)/, '');

      banner.push(' * ' + descText);
    }

    var statsItems = stats.replace(/\r/g, '').split('\n');

    for (var index in statsItems) {
      var item = statsItems[index];
      var text = item.replace(/^(\s*)/, '');

      banner.push(' * ' + text);
    }

    banner.push(' */');

    cb(banner);
  });
};

function EulerInit(problem, language, ext) {

  mkdirp.sync(path.join('.', language));
  getProblem(problem, function(banner) {
    fs.writeFileSync(path.join('.', language, problem + ext), banner.join('\n'));
  });

}

module.exports = EulerInit;
