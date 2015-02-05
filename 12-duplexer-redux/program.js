var duplexer = require('duplexer'),
    through  = require('through');

module.exports = function(counter) {

  var _list = {};

  var tr = through(function(row) {
    _list[row.country] = (_list[row.country] || 0) + 1;
  }, function() {
    counter.setCounts(_list);
  });

  return duplexer(tr, counter);
};