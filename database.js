const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_name = process.env.DB_NAME 

var mysql = require('mysql2');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : db_host,
  user     : db_user,
  password : db_password,
  database : db_name
});

// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = connection;