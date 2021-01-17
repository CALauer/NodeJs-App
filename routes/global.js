var express = require('express');
var router = express.Router();
var publicPosts = require('../controllers/posts')
router.get('/', function(req, res) {
        res.render('index', {page: ""});
});
router.get('/updates', function(req, res) {
        res.render('updates', {page: ""});
});
router.get('/stocks', function(req, res) {
        res.render('stocks', {page: ""});
});

// router.post('/feed', publicPosts.getPublicPosts) 


// Logged in variables


module.exports = router;