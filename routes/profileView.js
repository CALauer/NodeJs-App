var express = require('express');
var router = express.Router();
var profiles = require('../controllers/profiles')

router.get('/profileView/:username', profiles.getUserProfile)

module.exports = router;