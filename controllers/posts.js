const db = require('../database');
const auth = require('../routes/dashboard');

function getPublicPosts(req, res){
let privacy_level = 1;

        db.query('SELECT * FROM posts WHERE privacy_level = ?',privacy_level, function (error, results, fields) {
            if(results.length > 0){
                var data = [];
                console.log(results)
                for (var i = 0;i < results.length; i++) {
                    data.push({title: results[i].title, date: results[i].date, post: results[i].post});
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
        // posts.getPublicPosts()
        db.query('SELECT * FROM posts WHERE userId = ?', userID, function (error, results, fields) {
            var data = [];
            for (var i = 0;i < results.length; i++) {
                data.push({title: results[i].title, date: results[i].date, post: results[i].post});
            }
            res.send({ success: true, data})
            console.log(data)
            return data           
    })
} 




exports.getUserPosts = getUserPosts