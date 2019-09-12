const express = require('express');
const router = express.Router();
const pins = require('../public/javascripts/initPins.js');
const zones = require('../public/javascripts/find-sensors.js');
const swt = require('../public/javascripts/sensorsWithTime.js');
const pf = require('../public/javascripts/printFile.js');
const gpio = './public/scripts/gpiodetails.txt';
const sd = './public/scripts/sensordetails.txt';
const s = './public/scripts/sensors.txt';
const params = { where: gpio, what: 'printPins' };
const params1 = { where: s, what: 'printSensors' };
const params2 = { where: sd, what: 'printSwt' };
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await pins.initPins(req, res, next);
        if (req.printPins) {
            await pf.printFile(req, res, next, params);
            await zones.initSensors(req, res, next);
            await pf.printFile(req, res, next, params1);
            await swt.sensorsWithTime(req, res, next);

            if (req.printSwt) {
                await pf.printFile(req, res, next, params2);
                res.json(req.printSwt);
            }
        }
    }),
);

module.exports = router;

