
var mysql = require('mysql2');

var connection = mysql.createPool({
    host     : '162.241.226.190', // MYSQL HOST NAME
    user     : 'chrislc9_admin', // MYSQL USERNAME
    password : ',6Lc3.T)oD]*', // MYSQL PASSWORD
    database : 'chrislc9_db1' // MYSQL DB NAME
})


module.exports = connection;