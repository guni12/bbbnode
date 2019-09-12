const express = require('express');
const router = express.Router();

const settings = require('../public/javascripts/getOneRow.js');
const settingsParams = { table: 'settings', what: 'settings' };
const where = './public/scripts/today.txt';
const hub = require('../public/javascripts/hubinfo.js');
const pf = require('../public/javascripts/printFile.js');
const chosenParams = { where: where, what: 'chosen' };
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        await settings.getOne(req, res, next, settingsParams);
        await hub.hubinfo(req, res, next);
        if (req.chosen) {
            await pf.printFile(req, res, next, chosenParams);
            res.json(req.chosen);
        }
    }),
);

module.exports = router;
