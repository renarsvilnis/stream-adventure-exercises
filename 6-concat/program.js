// https://www.npmjs.com/package/concat-stream
var concat = require('concat-stream');

process.stdin
  .pipe(concat(function reverse_all_input(input) {
    process.stdout.write(input.toString().split('').reverse().join('') + '\n');
  }));
