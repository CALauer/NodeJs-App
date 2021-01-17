var express = require('express');
var router = express.Router();
var db = require('../database');
const posts = require('../controllers/posts');

/* GET users listing. */
router.get('/feed', function(req, res, next) {
    if(req.session.userInfo.loggedIn == true){
        res.render('feed', {page: ""})
        // console.log(req.session.title)
    }else{
        res.redirect('/', {page: ""});
    }
});


router.post('/feed', posts.getPublicPosts) 


module.exports = router;