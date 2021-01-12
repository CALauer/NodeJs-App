

var mysql = require('mysql2');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0 
});

// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = connection;