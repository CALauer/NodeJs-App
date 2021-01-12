
require('dotenv').config()
var mysql = require('mysql2');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
  waitForConnections: true
});

connection.query(
  'SELECT * FROM `users`',
  function(err, results) {
    console.log(results);
  }
);

module.exports = connection;