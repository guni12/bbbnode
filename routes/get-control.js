const express = require('express');
const router = express.Router();
const control = require('../public/javascripts/spotcal.js');

router.get("/",

    (req, res) => control.spotdata(req, res)
);

module.exports = router;
