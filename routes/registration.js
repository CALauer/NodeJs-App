
var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcryptjs');

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let hour = dateObj.getHours();
minutes = dateObj.getMinutes()
minutes = checkTime(minutes)
let postDate = year + "/" + month + "/" + day;
console.log(postDate)

// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form', {page: ""});
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
    db.query('SELECT * FROM users WHERE email = ? ',email, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        if(results.length > 0) {
          res.send({failed: "Existing Email Account"})
        } else {
          db.query('SELECT * FROM users WHERE username = ?',username, function (error, results, fields) {   
            if(results.length > 0) {
              res.send({failed: "Existing Username"})
            } else {            
              if(inputData(username, email, password, postDate)) {
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

async function inputData(username, email, password, date) {
  const encryptedPassword = await bcrypt.hash(password, 8)
  var users={
    "username": username,
    "email":email,
    "password":encryptedPassword,
    "created_at": postDate
  }
  db.query('INSERT INTO users SET ?',users,  function (error, results, fields) {
      if (error) {
        return false; 
        } else {
        return true;
      }
})
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

module.exports = router;