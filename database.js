const mysql = require('mysql2');

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_name = process.env.DB_NAME 


var connection = mysql.createPool({
  host     : '162.241.226.190', // MYSQL HOST NAME
  user     : 'chrislc9_admin', // MYSQL USERNAME
  password : ',6Lc3.T)oD]*', // MYSQL PASSWORD
  database : 'chrislc9_db1' // MYSQL DB NAME
}).promise();


module.exports = connection;