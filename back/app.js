const express = require('express')
const users = require('./routes/users')
const app = express()
const sql = require('./query.js')
const port = 3002

app.use('/users', users);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))