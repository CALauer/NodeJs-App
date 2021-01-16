var express = require('express');
var router = express.Router();
var publicPosts = require('../controllers/posts')
router.get('/', function(req, res) {
        res.render('index');
});
router.get('/updates', function(req, res) {
        res.render('updates');
});
router.get('/stocks', function(req, res) {
        res.render('stocks');
});

// router.post('/feed', publicPosts.getPublicPosts) 


// Logged in variables


module.exports = router;