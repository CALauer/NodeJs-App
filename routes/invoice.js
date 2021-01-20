let express = require('express');
let router = express.Router();
let profiles = require('../controllers/profiles')
let auth = require('../controllers/auth')
const db = require('../database');
let members = require('../controllers/members') 

router.get('/invoice', function(req, res) {
    res.render('invoice', {page: ""});
});
// router.get('/recInvoice', function(req, res) {
//     res.render('invoice', {page: ""});

// });
router.post('/recInvoice', function(req, res) {
    data = req.body
    console.log(data)
    res.send({success: true, data: data, page: ""});
});
// router.get('/recInvoice', function(req, res) {
//     data = req.body
//     res.render('invoice1', {data: data})
// });


module.exports = router;