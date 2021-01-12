var express = require('express');
var router = express.Router();
var db=require('../database');
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
        if(err) throw err
        if(data.length > 0){
            let dbpass = data[0].password
            if(bcrypt.compareSync(password,dbpass)){
                req.session.loggedinUser= true;
                req.session.email = email;
                res.redirect('/dashboard');
                db.end()
            }
            else {
                db.end()
                res.render('login-form',{alertMsg:"Password Incorrect"});
                
            }
        }else{
            db.end()
            res.render('login-form',{alertMsg:"Email Incorrect"});
        }
        db.end()
    })
})
module.exports = router;