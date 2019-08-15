const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/find-sensors.js');

router.get("/",
    (req, res, next) => zones.initPins(req, res, next),
    (req, res, next) => zones.printFile(req, res, next),
    (req, res, next) => zones.initSensors(req, res, next),
    (req, res, next) => zones.printFile(req, res, next),
    (req, res, next) => zones.sensorsWithTime(req, res, next),
    (req, res, next) => zones.printFile(req, res, next),
    (req, res) => zones.show(req, res)
);

module.exports = router;
