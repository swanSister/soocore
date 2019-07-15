
var dbconfig   = require('./config/database.js');
var mysql      = require('mysql');
const connection = mysql.createConnection(dbconfig);

module.exports = function (sql, callback) {
  connection.query(sql, function (error, results, fields) {
    if (error) return callback(error);
    callback(null, results)
  })
};