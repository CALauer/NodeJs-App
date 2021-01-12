
var mysql = require('mysql2');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : DB_HOST,
  user     : DB_USER,
  password : DB_PASS,
  database : DB_NAME,
  waitForConnections: true
});

connection.query(
  'SELECT * FROM `users`',
  function(err, results) {
    console.log(results);
  }
);

module.exports = connection;