const express = require('express')
const app = express()
const port = 3002
var cors = require('cors');

const users = require('./routes/users')
const sections = require('./routes/sections')
const invite = require('./routes/invite')
const images = require('./routes/images')
const score = require('./routes/score')

app.use(cors())
app.use('/users', users);
app.use('/sections', sections);
app.use('/invite', invite);
app.use('/images', images);
app.use('/score', score);

app.get('/uploads/*', function(req, res, path){
    console.log("#####uploads")
    var imagePath =  __dirname+req.url
    console.log("####", imagePath)
    res.sendFile(`${imagePath}.png`);
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))