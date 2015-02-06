var crypto = require('crypto');

process.stdin
  .pipe(crypto.createDecipher('AES256', process.argv[2]))
  .pipe(process.stdout);
