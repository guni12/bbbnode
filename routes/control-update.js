const express = require('express');
const router = express.Router();

const settings = require('../public/javascripts/getOneRow.js');
const rf = require('../public/javascripts/readFile.js');
const where = './public/scripts/today.txt';
const spotParams = { where: where, what: 'content' };
const hc = require('../public/javascripts/hour-control/spotcal');
const pf = require('../public/javascripts/printFile.js');
const settingsParams = {table: "settings", what: 'settings'};
const updParams = { where: './public/scripts/controls.txt', what: 'controls' };
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        req.table = "settings";
        await settings.getOne(req, res, next, settingsParams);
        await rf.getFile(req, res, next, spotParams);
        await hc.tocontrol(req, res, next);
        if (req.controls) {
            await pf.printFile(req, res, next, updParams);
            await rf.getFile(req, res, next, updParams);
            res.json(req.controls);
        }
    }),
);

module.exports = router;
