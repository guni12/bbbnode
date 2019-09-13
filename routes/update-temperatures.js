const express = require('express');
const router = express.Router();
const swt = require('../public/javascripts/sensorsWithTime');
const pf = require('../public/javascripts/printFile.js');
const update = require('../public/javascripts/updateSensors.js');
const where = './public/scripts/sensordetails.txt';
const params = { where: where, what: 'content' };
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await swt.sensorsWithTime(req, res, next);
        if (req.content) {
            await pf.printFile(req, res, next, params);
            await update.updateSensors(req, res, next);
            res.json(req.show);
        }
    }),
);

module.exports = router;
