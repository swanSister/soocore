
var exec = require('child_process').exec;
exec("http-server ./dist/ -p 3000", function(a){
  console.log("aaaaaa",a)
});