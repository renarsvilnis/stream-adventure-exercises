var through = require('through');
var split = require('split');

var count = 0;
var tr = through(function(chunk) {
  count++;
  var string = chunk.toString();

  string = count % 2 ? string.toUpperCase() : string.toLowerCase();

  this.queue(string);
  // return string;
}, function() {
  this.queue(null);
});

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout);