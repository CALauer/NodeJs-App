
var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcryptjs');

// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form');
});

// to store user input detail on post request
router.post('/register', function(req,res){
  // console.log(req.body + "This is the body")

  if(req.body) {
    // Assign Variables from AJAX post
    const username = req.body.username
    const password = req.body.password
    const cPassword = req.body.confirmedPassword
    const email = req.body.email
   

    // Check for similar username/email
    db.query('SELECT * FROM users WHERE email = ?',email, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        if(results.length > 0) {
          res.send({failed: "Existing Email Account"})
          console.log("Existing Email Account")
        } else {
          db.query('SELECT * FROM users WHERE username = ?',username, function (error, results, fields) {   
            if(results.length > 0) {
              res.send({failed: "Existing Username"})
              console.log("Existing  Username")
            } else {            
              if(inputData(username, email, password)) {
              res.send({success: true})
              } else {
                res.send({failed: "Something went wong."})
              }
          }
          })
        }
      }
    })
  }
})

async function inputData(username, email, password) {
  const encryptedPassword = await bcrypt.hash(password, 8)
  var users={
    "username": username,
    "email":email,
    "password":encryptedPassword
  }
  db.query('INSERT INTO users SET ?',users,  function (error, results, fields) {
      if (error) {
        return false; 
        } else {
        return true;
      }
})
}




  //   const encryptedPassword = await bcrypt.hash(password, 8)
  //   // console.log(body)
  //   res.send({success: true})

  // } else {
  //   res.send({success: false})
  // }






//     const password = req.body.password;
//     const confirmed = req.body.confirm_password
//     if (password == confirmed) {

//     const encryptedPassword = await bcrypt.hash(password, 8)
//     var users={
//        "email":req.body.email,
//        "password":encryptedPassword
//      }

//     db.query('INSERT INTO users SET ?',users, function (error, results, fields) {
//       if (error) {
//         res.send({
//           "code":400,
//           "failed":"error ocurred"
//         })
//       } else {
//         var msg ="You have successfully registered";
//         res.render('registration-form',{alertMsg:msg});
//         }
//     });
//     }else {
//         var msg ="Passwords do not match";
//         res.render('registration-form',{alertMsg:msg});    

// }






























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