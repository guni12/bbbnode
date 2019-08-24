const express = require('express');
const router = express.Router();
const rf = require('../public/javascripts/readFile.js');
const change = require('../public/javascripts/gpio/update-gpio.js');
const updl = require('../public/javascripts/gpio/upd-gpio-list.js');
const pf = require('../public/javascripts/printFile.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/gpiodetails.txt';
const params = { where: where };
const params1 = { where: where, what: 'newlist' };

router.post("/",
    (req, res, next) => rf.getFile(req, res, next, params),
    (req, res, next) => change.update(req, res, next),
    (req, res, next) => updl.updateList(req, res, next, ['updated', 'content']),
    (req, res, next) => pf.printfile(req, res, next, params1),
    (req, res) => show.show(req, res, 'newlist')
);

module.exports = router;
