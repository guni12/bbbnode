const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/getOneRow.js');
const rf = require('../public/javascripts/readFile.js');
const pf = require('../public/javascripts/printFile.js');
const zones = require('../public/javascripts/all-tables.js');
const control = require('../public/javascripts/hour-control/hour-control.js');
const where = './public/scripts/gpiodetails.txt';
const today = './public/scripts/today.txt';
const spotTodayParams = { where: today, what: 'content' };
const controlsParams = { where: './public/scripts/controls.txt', what: 'controls' };
const prepParams = { where: where, what: 'prepGpiodetails' };
const gpioParams = { where: where, what: 'gpiodetails' };
const zoneParams = { table: 'zones', where: './zones', what: 'zones' };
const settingsParams = { table: 'settings', where: './settings', what: 'settings' };
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        await settings.getOne(req, res, next, settingsParams);
        await rf.getFile(req, res, next, spotTodayParams);
        await rf.getFile(req, res, next, controlsParams);
        await zones.getAll(req, res, next, zoneParams);
        await rf.getFile(req, res, next, prepParams);
        await control.update(req, res, next, gpioParams);

        if (req.gpiodetails) {
            await pf.printFile(req, res, next, gpioParams);
            res.json(req.gpiodetails);
        }
    })
);

module.exports = router;
