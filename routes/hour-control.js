const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/get-settings.js');
const calc = require('../public/javascripts/spotcal.js');
const zones = require('../public/javascripts/all-zones.js');
const control = require('../public/javascripts/hour-control.js');
const update = require('../public/javascripts/update-gpio.js');

router.get("/:id?",
    (req, res, next) => settings.asksqlite(req, res, next),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getZones(req, res, next),
    (req, res, next) => update.readList(req, res, next, 'gpiodetails.txt', 'prep_gpiodetails'),
    (req, res, next) => control.update(req, res, next),
    (req, res, next) => update.readList(req, res, next, 'gpiodetails.txt', 'gpiodetails'),
    (req, res) => control.show(req, res, 'gpiodetails')
);

module.exports = router;
