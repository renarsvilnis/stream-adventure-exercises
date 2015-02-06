var split = require('split');
var combine = require('stream-combiner');
var through = require('through');
var zlib = require('zlib');

module.exports = function() {
  var row = null;

  var write = function(entry) {

    if(!entry || entry.length === 0)
      return;

    entry = JSON.parse(entry);

    if(entry.type == 'genre') {

      if(row)
        this.queue(JSON.stringify(row) + '\n');

      row = {
        name: entry.name,
        books: []
      };

    } else if(entry.type == 'book') {
      row.books.push(entry.name);
    }

  };

  var end = function() {
    if(row)
      this.queue(JSON.stringify(row) + '\n');
    this.queue(null);
  };

  return combine(
    split(),
    through(write, end),
    zlib.createGzip()
  );
};