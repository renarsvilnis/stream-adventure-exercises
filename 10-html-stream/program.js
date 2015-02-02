var trumpet = require('trumpet');
var through = require('through');

var tr = trumpet();

process.stdin
  .pipe(tr);

var stream = tr.select('.load').createStream();

stream.pipe(process.stdout);