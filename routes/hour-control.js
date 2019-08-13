const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/get-settings.js');
const calc = require('../public/javascripts/spotcal.js');
const zones = require('../public/javascripts/all-zones.js');
const control = require('../public/javascripts/hour-control.js');

router.get("/",
    (req, res, next) => settings.asksqlite(req, res, next),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getAllZones(req, res, next),
    (req, res) => control.update(req, res));

router.get("/:id",
    (req, res, next) => settings.asksqlite(req, res, next),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getOneZone(req, res, next),
    (req, res) => control.update(req, res));

module.exports = router;
