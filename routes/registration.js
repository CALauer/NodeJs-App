
var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcryptjs');

// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form');
});

// to store user input detail on post request
router.post('/register', async function(req,res){
    const password = req.body.password;
    const confirmed = req.body.confirm_password
    if (password == confirmed) {

    const encryptedPassword = await bcrypt.hash(password, 8)
    var users={
       "email":req.body.email,
       "password":encryptedPassword
     }

    db.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        var msg ="You have successfully registered";
        res.render('registration-form',{alertMsg:msg});
        }
    });
    }else {
        var msg ="Passwords do not match";
        res.render('registration-form',{alertMsg:msg});    

}
  })






























//     let inputData ={
//         email: req.body.email,
//         password: req.body.pssword,
//         confirm_password: confirmedPassword
//     }
//     var confirmedPassword = req.body.confirm_password
//     hashedPass = bcrypt.hashSync(confirmedPassword, 8);

// // check unique email address
// var sql='SELECT * FROM users WHERE email =?';
// db.query(sql, inputData.email, function (err, data, fields) {
//  if(data.length > 0){
//      var msg = req.body.email + "already exists";
     
//  }else if(inputData.confirm_password != inputData.password){
//     var msg ="Password & Confirm Password is not Matched";
//  }else{
//     inputData ={
//         email: req.body.email,
//         password: hashedPass
//     }
//     // save users data into database
//     var sql = 'INSERT INTO users SET ?';
//    db.query(sql, inputData, function (err, data) {
//       if (err) throw err;
//            });
//   var msg ="Your are successfully registered";
//  }
//  res.render('registration-form',{alertMsg:msg});
//  db.releaseConnection(db);
// })
     
// });
module.exports = router;