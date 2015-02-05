var split = require('split');
var combine = require('stream-combiner');
var through = require('through');
var zlib = require('zlib');

module.exports = function() {

  var row = null;
  var list = {};

  return combine(
    process.stdin,
    split(),
    through(function(entry) {

      if(entry.type == 'genre') {
        // reset row
        if(typeof row != 'undefined') {
          this.queue(row);
          row = null;
        }

        row = {
          name: entry.name,
          books: []
        };

      } else {
        row.books.push(entry.name);
      }

    }, function() {
      if(typeof row != 'undefined')
        this.queue(row);
    }),
    zlib.createGzip(),
    process.stdout
  );
};