var express = require('express');
var router = express.Router();
var db = require('../database');
/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
    if(req.session.loggedinUser == true){
        res.render('dashboard',{email:req.session.email, title:req.session.title})
        // console.log(req.session.title)
    }else{
        res.redirect('/');
    }
});
router.get('/admin', function(req, res, next) {
    if(req.session.loggedinUser == true && req.session.title == "Admin"){
        res.render('admin',{email:req.session.email, title:req.session.title})
        // console.log(req.session.title)
    }else{
        res.redirect('/');
    }
});
router.post('/post-user-blog', function(req, res, next) {   
    userID = req.session.userId
    postTitle = req.body.title
    postBody = req.body.post
    postPrivacy = req.body.privacy_level 

    postData = {
        "title": postTitle,
        "userId": userID,
        "post": postBody,
        "privacy_level":  postPrivacy
    }
    console.log(postData)
    if(postTitle != "" && userID != "" && postBody != "") {
        db.query('INSERT INTO posts SET ?', postData, function (error, results, fields) {
            if (error) {
              res.send({
                "code":400,
                "failed": "An error ocurred"
              })
            } else {
              res.json({ success: true })
              }
            })
        }
    })
router.post('/my-blog-posts', function(req, res, next) {   
        userID = req.session.userId
        console.log(userID)
        db.query('SELECT * FROM posts WHERE userId = ?', userID, function (error, results, fields) {
            var data = [];
            for (var i = 0;i < results.length; i++) {
                data.push({title: results[i].title, date: results[i].date, post: results[i].post});
            }
            res.send({ success: true, data})
            res.end(JSON.stringify(data));
            console.log(data)
    })
})
module.exports = router;