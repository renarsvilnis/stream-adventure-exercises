var through = require('through');
var http = require('http');

var server = http.createServer(function(req, res) {
  if(req.method === 'POST') {
    req
      .pipe(through(function(chunk) {
        this.queue(chunk.toString().toUpperCase());
      }))
      .pipe(res);
  } else {
    res.end('Send me POST data\n');
  }
});

server.listen(process.argv[2]);