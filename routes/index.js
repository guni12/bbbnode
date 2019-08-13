const express = require('express');
const router = express.Router();
const home = require('../public/javascripts/index.js');

router.get('/', function(req, res) {
    var info = home.find();

    res.json(info);
});

module.exports = router;
