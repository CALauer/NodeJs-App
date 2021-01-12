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
    var email = req.body.email_address;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
          })
        }else{
          if(results.length >0){
            const comparision = await bcrypt.compare(password, results[0].password)
            if(comparision){
                req.session.loggedinUser= true;
                req.session.email = email;
                res.redirect('/dashboard')
            }
            else{
              res.send({
                   "code":204,
                   "success":"Email and password does not match"
              })
            }
          }
          else{
            res.send({
              "code":206,
              "success":"Email does not exits"
                });
          }
        }
        });
    })
module.exports = router;