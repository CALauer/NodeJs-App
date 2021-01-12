var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
        res.render('index');
});
router.get('/updates', function(req, res, next) {
        res.render('updates');
});


module.exports = router;