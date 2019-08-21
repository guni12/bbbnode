const express = require('express');
const router = express.Router();
const show = require('../public/javascripts/showSpot.js');

router.get("/",
    (req, res) => show.spotdata(req, res)
);

module.exports = router;
