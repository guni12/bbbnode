const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/get-settings.js');
const calc = require('../public/javascripts/spotcal.js');
const zones = require('../public/javascripts/all-zones.js');
const control = require('../public/javascripts/hour-control.js');
const update = require('../public/javascripts/update-gpio.js');

router.get("/",
    (req, res, next) => settings.asksqlite(req, res, next),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getAllZones(req, res, next),
    (req, res, next) => update.readList(req, res, next, 'gpiodetails.txt'),
    (req, res, next) => control.update(req, res, next),
    (req, res, next) => update.readList(req, res, next, 'gpiodetails.txt'),
    (req, res) => control.show(req, res)
);

router.get("/:id",
    (req, res, next) => settings.asksqlite(req, res, next),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getOneZone(req, res, next),
    (req, res, next) => update.readList(req, res, next, 'gpiodetails.txt'),
    (req, res, next) => control.update(req, res, next),
    (req, res, next) => update.updateFile(req, res, next),
    (req, res, next) => update.readList(req, res, next, 'gpiodetails.txt'),
    (req, res) => control.show(req, res)
);

module.exports = router;
