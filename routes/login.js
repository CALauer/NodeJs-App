var express = require('express');
var MySQLStore = require('express-mysql-session');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcryptjs');
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login-form');
});
router.post('/login', function(req, res){
    let email = req.body.email_address;
    let password = req.body.password;
    let sql='SELECT * FROM users WHERE email =?';
    db.query(sql, [email, password], function (err, data, fields) {
        console.log("queried")
        if(err) throw err
        if(data.length > 0){
            let dbpass = data[0].password
            if(bcrypt.compareSync(password,dbpass)){
                req.session.loggedinUser= true;
                req.session.email = email;
                console.log(email)
                res.redirect('./dashboard');
            }
            else {
                res.render('login-form',{alertMsg:"Password Incorrect"});
                
            }
        }else{
            res.render('login-form',{alertMsg:"Email Incorrect"});
        }
    })
})
module.exports = router;