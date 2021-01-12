const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_name = process.env.DB_NAME 

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : db_host,
  user     : db_user,
  password : db_password,
  database : db_name
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
    connection.end()
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;