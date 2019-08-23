const express = require('express');
const router = express.Router();
const rf = require('../public/javascripts/readFile.js');
const change = require('../public/javascripts/update-gpio.js');
const pf = require('../public/javascripts/printFile.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/gpiodetails.txt';

router.post("/",
    (req, res, next) => rf.getFile(req, res, next, where),
    (req, res, next) => change.update(req, res, next),
    (req, res, next) => change.updateList(req, res, next, 'updated', 'content'),
    (req, res, next) => pf.printfile(req, res, next, where, 'newlist'),
    (req, res) => show.show(req, res, 'newlist')
);

module.exports = router;
