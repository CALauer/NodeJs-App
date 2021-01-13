var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
        res.render('index');
});
router.get('/updates', function(req, res) {
        res.render('updates');
});


// Logged in variables


module.exports = router;