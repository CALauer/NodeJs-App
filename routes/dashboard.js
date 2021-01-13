var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
    if(req.session.loggedinUser == true){
        res.render('dashboard',{email:req.session.email})
        console.log(req.session)
        console.log(req.session.email)
    }else{
        res.redirect('/');
    }
});
module.exports = router;