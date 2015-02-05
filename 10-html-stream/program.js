var trumpet = require('trumpet');
var through = require('through');

var tr = trumpet();
var trStream = tr.selectAll('.loud').createStream();
trStream.pipe(through(function(chunk) {
  this.queue(chunk.toString().toUpperCase());
})).pipe(trStream);

process.stdin
  .pipe(tr)
  .pipe(process.stdout);
