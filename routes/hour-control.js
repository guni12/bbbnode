const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/get-settings.js');
const rf = require('../public/javascripts/readFile.js');
const calc = require('../public/javascripts/hour-control/spotcal.js');
const zones = require('../public/javascripts/all-zones.js');
const control = require('../public/javascripts/hour-control/hour-control.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/gpiodetails.txt';
const today = './public/scripts/array.txt';
const params = { where: today };
const params1 = { where: where, what: 'prep_gpiodetails' };
const params2 = { where: where, what: 'gpiodetails' };

router.get("/:id?",
    (req, res, next) => settings.asksqlite(req, res, next),
    (req, res, next) => rf.getFile(req, res, next, params),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getZones(req, res, next),
    (req, res, next) => rf.getFile(req, res, next, params1),
    (req, res, next) => control.update(req, res, next),
    (req, res, next) => rf.getFile(req, res, next, params2),
    (req, res) => show.show(req, res, 'gpiodetails')
);

module.exports = router;
