
var mysql = require('mysql2');

var connection = mysql.createPool({
    host     :  process.env.DB_HOST, // MYSQL HOST NAME
    user     : process.env.DB_USER, // MYSQL USERNAME
    password : process.env.DB_PASS, // MYSQL PASSWORD
    database : process.env.DB_NAME // MYSQL DB NAME
})



module.exports = connection;