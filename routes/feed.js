var express = require('express');
var router = express.Router();
var db = require('../database');
const posts = require('../controllers/posts');

/* GET users listing. */
router.get('/feed', function(req, res, next) {
    if(req.session.loggedinUser == true){
        res.render('feed')
        // console.log(req.session.title)
    }else{
        res.redirect('/');
    }
});


router.post('/feed', posts.getPublicPosts) 


module.exports = router;