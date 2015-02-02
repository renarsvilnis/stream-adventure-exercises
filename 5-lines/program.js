var through = require('through');
var split = require('split');

var count = 0;
var tr = through(function(chunk) {
  var string = chunk.toString();
  string = count % 2 ? string.toUpperCase() + '\n' : string.toLowerCase() + '\n';
  // new line is important!

  this.queue(string);
  count++;
});

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout);