const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/find-sensors.js');

router.get("/",
    (req, res, next) => zones.initPins(req, res, next),
    (req, res, next) => zones.printFile(req, res, next, 'gpiodetails.txt', 'printPins'),
    (req, res, next) => zones.initSensors(req, res, next),
    (req, res, next) => zones.printFile(req, res, next, 'sensors.txt', 'printSensors'),
    (req, res, next) => zones.sensorsWithTime(req, res, next),
    (req, res, next) => zones.printFile(req, res, next, 'sensordetails.txt', 'printSwt'),
    (req, res) => zones.show(req, res)
);

module.exports = router;
