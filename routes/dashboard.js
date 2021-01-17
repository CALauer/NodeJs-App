var express = require('express');
var router = express.Router();
var db = require('../database');
const posts = require('../controllers/posts');
const auth = require ('../controllers/auth')

/* GET users listing. */
router.get('/dashboard', auth.checkAuth, function(req, res) {
        res.render('dashboard',{email, title, userName, userId, page: ""})

});
router.get('/admin', auth.checkAuth, function(req, res, next) {
    if(status == true && title == "Admin"){
        res.render('admin',{email:req.session.email, title:req.session.userPerm, page: ""})
        // console.log(req.session.title)
    }else{
        res.redirect('/');
    }
});
router.post('/post-user-blog', posts.postUserBlog)

router.post('/my-blog-posts', posts.getUserPosts) 

module.exports = router;