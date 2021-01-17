const db = require('../database');
const auth = require('../routes/dashboard');

function getPublicPosts(req, res){
let privacy_level = 1;

        db.query('SELECT * FROM posts WHERE privacy_level = ? ORDER BY id',privacy_level, function (error, results, fields) {
            if(results.length > 0){
                var data = [];
                console.log(results)
                for (var i = 0;i < results.length; i++) {
                    data.push({title: results[i].title, date: results[i].date, post: results[i].post, blogId: results[i].id, username: results[i].username});
                }
                res.send({success: true, data})
                console.log(data)
                return data
            } else {
                res.send({failed: "There are no public posts available"})
            }


    })

}
exports.getPublicPosts = getPublicPosts


function getUserPosts(req, res) {
        userID = req.session.userInfo.userId
        console.log(userID)
        
        db.query('SELECT * FROM posts WHERE userId = ? ORDER BY id DESC', userID, function (error, results, fields) {
            if(results.length > 0) {

            var data = [];
            for (var i = 0;i < results.length; i++) {
                data.push({title: results[i].title, date: results[i].date, post: results[i].post, blogId: results[i].id, username: results[i].username});
            }
            res.send({ success: true, data})
            console.log(data)
            return data    
        } else {
            res.send({failed: "No posts available"})
        }

    })
} 
exports.getUserPosts = getUserPosts

function postUserBlog(req, res) {
    userID = req.session.userInfo.userId
    postTitle = req.body.title
    postBody = req.body.post
    postPrivacy = req.body.privacy_level 
    postDate = req.body.date
    username = req.session.userInfo.username
    console.log(req.body)

    postData = {
        "title": postTitle,
        "userId": userID,
        "post": postBody,
        "privacy_level":  postPrivacy,
        "date": postDate,
        "username": username
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
    }
exports.postUserBlog = postUserBlog