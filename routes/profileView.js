let express = require('express');
let router = express.Router();
let profiles = require('../controllers/profiles')
let auth = require('../controllers/auth') 

router.get('/profileView/:username', auth.checkAuth, profiles.getUserProfile)

module.exports = router;