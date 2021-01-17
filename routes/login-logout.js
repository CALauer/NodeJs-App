let express = require('express');
var MySQLStore = require('express-mysql-session');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcryptjs');
/* GET users listing. */
router.get('/logout', function(req, res, next) {
  if(req.session.userInfo.loggedIn == true){
    req.session.userInfo.loggedIn = false
    req.sessionStore.options.userCount -= 1
    req.session.destroy()
    res.redirect('/')
    console.log(req.session)
    next()
}else{
  res.redirect('/', {page: ""});
}
})
router.get('/login', function(req, res, next) {
  res.render('login-form', {page: ""})
});
router.post('/login', async function(req, res){
    var email = req.body.email_address;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
          })
        }else{
          if(results.length > 0){
            const comparision = await bcrypt.compare(password, results[0].password)
            if(comparision){
                
                req.session.userInfo = {
                  loggedIn: true,
                  email: email,
                  userId: results[0].id,
                  userPerm: results[0].title,
                  username: results[0].username
                }

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