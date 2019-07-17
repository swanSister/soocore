var express = require('express');
var server = express();

server.use('/', express.static(__dirname + '/dist'));
server.listen(3000,function(){
  console.log("3000 cors ")
});