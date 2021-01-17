const db = require('../database');
const auth = require('../routes/dashboard');

function getUserProfile(req, res) {
        username = req.params.username
        // posts.getPublicPosts()
        db.query('SELECT * FROM users WHERE username = ?', username, function (error, results, fields) {
            console.log(results.length)
            if(results.length > 0) {
                var userData = {
                    username: results[0].username,
                    title: results[0].title,
                    postCount: results[0].post_count,
                    email: results[0].email
                };
                res.render('profile',{
                    email: userData.email,
                    title: userData.title,
                postCount: userData.postCount,
                 userName: userData.username,
                     page: "."
                })
                return userData
            } else {
                res.redirect('/dashboard')
            }
        })
    } 
exports.getUserProfile = getUserProfile