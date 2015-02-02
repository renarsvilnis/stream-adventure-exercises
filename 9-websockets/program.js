var websocket = require('websocket-stream');
var ws = websocket('ws://127.0.0.1:8000');

ws.end('hello\n');