var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var through = require('through');

var parser = tar.Parse();
parser.on('entry', function(entry) {
  if(entry.type != 'File')
    return;

  entry
    .pipe(crypto.createHash('md5', { encoding: 'hex' }))
    .pipe(through(null, function() {
      this.queue(' ' + entry.path + '\n');
    }))
    .pipe(process.stdout);
});

process.stdin
  .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
  .pipe(zlib.createGunzip())
  .pipe(parser);