let express = require('express');
let router = express.Router();
let profiles = require('../controllers/profiles')
let auth = require('../controllers/auth')
const db = require('../database');
let invoice = require('../controllers/invoice') 





router.get('/invoice', function(req, res) {
    res.render('invoice', {page: ""});
})



// router.post('/recInvoice', function(req, res, next) {
//     data = req.body
//     res.render('invoiceDefault', {page: ""})
//     // res.send({success: true, data: data, page: ""});
//     // next()
// });
router.post('/recInvoice', invoice.retrieveInvoice) 



router.get('/invoiceDefault', function(req, res) {
    res.render('invoiceDefault', {page: ""});
});

// });
// router.post('/recInvoice', invoice.retrieveInvoice)



// router.get('/recInvoice', function(req, res) {
//     data = req.body
//     res.render('invoice1', {data: data})
// });


module.exports = router;