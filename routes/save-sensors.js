const express = require('express');
const router = express.Router();
const swt = require('../public/javascripts/sensors/sensorsWithTime.js');
const sensors = require('../public/javascripts/db/all-tables.js');
const sensorsParams = {table: "sensors", what: 'sensors'};
const fns = require('../public/javascripts/sensors/find-newsensors.js');
const ss = require('../public/javascripts/sensors/saveSensors.js');
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await swt.sensorsWithTime(req, res, next);
        await sensors.getAll(req, res, next, sensorsParams);
        if (req.content) {
            await fns.findnew(req, res, next, "newsensors");
            await ss.insert(req, res, next, "newsensors");
            res.json(req.content);
        }
    }),
);

module.exports = router;
