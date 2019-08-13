const express = require('express');
const router = express.Router();
const change = require('../public/javascripts/update-gpio.js');

router.post("/",
    (req, res) => change.update(req, res)
);

module.exports = router;
