const express = require('express');
const router = express.Router();
const swt = require('../public/javascripts/sensors/sensorsWithTime');
const update = require('../public/javascripts/sensors/updateSensors.js');
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await swt.sensorsWithTime(req, res, next);
        if (req.content) {
            await update.updateSensors(req, res, next);
            res.json(req.show);
        }
    }),
);

module.exports = router;
