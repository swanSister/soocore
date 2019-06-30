const express = require('express')
const app = express()
const path = require('path')
const appRoot = path.resolve(__dirname);

const port = 3000
console.log(appRoot+'/dist/index.html')
app.get('/',function(req,res) {
  console.log("###")
    res.sendFile(appRoot+'/dist/index.html');
  });

app.listen(port, () => console.log(`Production app listening on port ${port}!`))