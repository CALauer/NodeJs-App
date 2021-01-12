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
        let randomString = bcrypt.hashSync('/,;tT5%6', 8);
            if(data.length > 0){
                let dbpass = data[0].password
                if(bcrypt.compareSync(password,dbpass)){
                    req.session.loggedinUser= true;
                    req.session.email = email;
                    console.log("Logged in")
                    db.releaseConnection(db);
                    res.redirect('/dashboard'), {};
                } else if (bcrypt.compareSync(randomString, dbpass)){
                    res.render('login-form',{alertMsg:"Password Incorrect"});
                    console.log("2nd else")
                    db.releaseConnection(db);
                } else {
                    res.render('login-form',{alertMsg:"Email Incorrect"});
                    console.log("3rd else")
                    db.releaseConnection(db);
                }         
        }
    })  
})
//             if(data[0].length > 0){
//             let dbpass = data[0].password
//             if(bcrypt.compareSync(password,dbpass)){
//                 req.session.loggedinUser= true;
//                 req.session.email = email;
//                 console.log(email)
//                 res.redirect('dashboard');
//             }
//             else {
//                 res.render('login-form',{alertMsg:"Password Incorrect"});
                
//             }
//         }else{
//             res.render('login-form',{alertMsg:"Email Incorrect"});
//         }
//     })
// })
module.exports = router;