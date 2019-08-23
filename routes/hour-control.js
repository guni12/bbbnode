const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/get-settings.js');
const rf = require('../public/javascripts/readFile.js');
const calc = require('../public/javascripts/spotcal.js');
const zones = require('../public/javascripts/all-zones.js');
const control = require('../public/javascripts/hour-control.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/gpiodetails.txt';
const today = './public/array.txt';

router.get("/:id?",
    (req, res, next) => settings.asksqlite(req, res, next),
    (req, res, next) => rf.getFile(req, res, next, today),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getZones(req, res, next),
    (req, res, next) => rf.getFile(req, res, next, where, 'prep_gpiodetails'),
    (req, res, next) => control.update(req, res, next),
    (req, res, next) => rf.getFile(req, res, next, where, 'gpiodetails'),
    (req, res) => show.show(req, res, 'gpiodetails')
);

module.exports = router;
