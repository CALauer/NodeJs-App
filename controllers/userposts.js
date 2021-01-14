
var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcryptjs');

// to display registration form
router.get('/', function(req, res) {
    res.render('dashboard');
});



            // Checks for empty privacy level 
        // } else if (title != "" && post != "" && privacyLevel == ""){
        //     console.log("Please choose a privacy level")
        //     res.redirect("/dashboard")
        //     // Checks for empty title
        // } else  if (title == "" && post != "" && privacyLevel != ""){ 
        //     console.log("Please fill in title")
        //     res.redirect("/dashboard")
        //     // Checks for empty post
        // } else  if (title != "" && post == "" && privacyLevel != ""){ 
        //     console.log("Please fill in body")
        //     res.redirect("/dashboard")
        //     // Checks for empty privacy level
        // } else  if (title == ""|| post == "" || privacyLevel == ""){ 
        //     console.log("Please fill in body")
        //     res.redirect("/dashboard")
        // } else {
        //     console.log("Please fill in all fields")
        //     res.redirect("/dashboard")

    
    // const confirmed = req.body.confirm_password
    // if (password == confirmed) {

    // const encryptedPassword = await bcrypt.hash(password, 8)
    // var users={
    //    "email":req.body.email,
    //    "password":encryptedPassword
    //  }

    // db.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    //   if (error) {
    //     res.send({
    //       "code":400,
    //       "failed":"error ocurred"
    //     })
    //   } else {
    //     var msg ="You have successfully registered";
    //     res.render('registration-form',{alertMsg:msg});
    //     }
    // });
    // }else {
    //     var msg ="Passwords do not match";
    //     res.render('registration-form',{alertMsg:msg});    























module.exports = router;