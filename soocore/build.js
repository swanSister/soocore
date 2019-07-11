const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const pug = require('pug');
var exec = require('child_process').exec;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/build', function(req, res) {
  res.render('index.pug');
  startBuild()
});
function startBuild(){
    runExec('forever stop soocore', 'git pull...', function(){
      runExec('git pull origin master', 'building...', function(){
        runExec('npm run build', 'deploy...', function(){
          runExec('forever start --uid "soocore" deploy.js', 'complete!!', function(){

          })
        })
      })
    })
}

function runExec(command, message,cb){
  setTimeout(function(){
    exec(command, (error, stdout, stderr) => {
      if (error) {
        io.emit('data', 'error : ' + error);
      }
      io.emit('data', message);
      if(cb){
        cb()
      }
    });
  },1000)
  
}

io.on('connection', function (socket) {
    console.log('client connected');       
    socket.on('disconnect', function() {
        console.log('client disconnected');
    });  
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});