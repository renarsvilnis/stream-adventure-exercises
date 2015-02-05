var cp = require('child_process');
var duplexer = require('duplexer');

module.exports = function(cmd, args) {
  var spawn = cp.spawn(cmd, args);
  return duplexer(spawn.stdin, spawn.stdout);
};