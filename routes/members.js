

let express = require('express');
let router = express.Router();
let profiles = require('../controllers/profiles')
let auth = require('../controllers/auth')
const db = require('../database');
let members = require('../controllers/members') 

router.get('/members', auth.checkAuth, members.getAllMembers, function(req, res){
    res.render('members', {page: "", list: list})
    console.log(list)

})



module.exports = router;