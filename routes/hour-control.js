const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/db/getOneRow.js');
const rf = require('../public/javascripts/readFile.js');
const table = require('../public/javascripts/db/all-tables.js');
const control = require('../public/javascripts/hour-control/hour-control.js');
const today = './public/scripts/today.txt';
const spotTodayParams = { where: today, what: 'content' };
const controlsParams = { where: './public/scripts/controls.txt', what: 'controls' };
const gpiosParams = { table: 'gpios', what: 'gpios' };
const gpios2Params = { table: 'gpios', what: 'gpios2' };
const settingsParams = { table: 'settings', where: '.settings', what: 'settings' };
const rooms = require('../public/javascripts/db/rooms-sensors.js');
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        await settings.getOne(req, res, next, settingsParams);
        await rf.getFile(req, res, next, spotTodayParams);
        await rf.getFile(req, res, next, controlsParams);
        await table.getAllRows(req, res, next, gpiosParams);
        await rooms.leftJoin(req, res, next);
        await control.update(req, res, next);
        await table.getAllRows(req, res, next, gpios2Params);
        res.json(req.gpios2);
    })
);

module.exports = router;
