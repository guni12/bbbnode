const express = require('express');
const router = express.Router();
const change = require('../public/javascripts/update-gpio.js');

router.post("/",
    (req, res, next) => change.readList(req, res, next, 'gpiodetails.txt'),
    (req, res, next) => change.update(req, res, next),
    (req, res, next) => change.updateFile(req, res, next),
    (req, res) => change.writeList(req, res)
);

module.exports = router;
