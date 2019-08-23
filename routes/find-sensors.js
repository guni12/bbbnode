const express = require('express');
const router = express.Router();
const pins = require('../public/javascripts/initPins.js');
const zones = require('../public/javascripts/find-sensors.js');
const swt = require('../public/javascripts/sensorsWithTime.js');
const pf = require('../public/javascripts/printFile.js');
const show = require('../public/javascripts/show.js');
const gpio = './public/scripts/gpiodetails.txt';
const sd = './public/scripts/sensordetails.txt';
const s = './public/scripts/sensors.txt';

router.get("/",
    (req, res, next) => pins.initPins(req, res, next),
    (req, res, next) => pf.printFile(req, res, next, gpio, 'printPins'),
    (req, res, next) => zones.initSensors(req, res, next),
    (req, res, next) => pf.printFile(req, res, next, s, 'printSensors'),
    (req, res, next) => swt.sensorsWithTime(req, res, next),
    (req, res, next) => pf.printFile(req, res, next, sd, 'printSwt'),
    (req, res) => show.show(req, res, 'printobj')
);

module.exports = router;
