var through = require('through');
var request = require('request');

var req = request.post('http://127.0.0.1:8000');

process.stdin
  .pipe(req)
  .pipe(process.stdout);