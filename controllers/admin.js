const db = require('../database')

function sendUserList(req, res, next) {
    console.log("Called")
    db.query('SELECT * FROM users WHERE title = "Employee"', function (error, results, fields) {
        if(results.length > 0){
            res.send({success: true, results})
        } else {
            res.send({failed: "There are no registered users"})
        }
    })    
}

function promoteUser() {

}
function deleteUser(req, res, next) {
    console.log(req.params)
    console.log("Attempting to delete user")
    res.send({success: true})
    next()
}

exports.sendUserList = sendUserList
exports.deleteUser = deleteUser
