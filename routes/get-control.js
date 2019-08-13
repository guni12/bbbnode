const express = require('express');
const router = express.Router();
const control = require('../public/javascripts/get-control.js');

router.get("/",

    (req, res) => control.spotdata(req, res)
);

module.exports = router;
