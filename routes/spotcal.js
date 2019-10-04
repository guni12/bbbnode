const express = require('express');
const router = express.Router();

const settings = require('../public/javascripts/db/getOneRow.js');
const settingsParams = { table: 'settings', what: 'settings' };
const spi = require('../public/javascripts/spi/makeSpotInfo');
const pf = require('../public/javascripts/printFile.js');
const chosenParams = { what: 'chosen' };
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        await settings.getOne(req, res, next, settingsParams);
        await spi.makeSpotInfo(req);
        if (req.chosen) {
            chosenParams.where = req.params.id === '2' ?
                './public/scripts/today2.txt' :
                './public/scripts/today.txt';
            await pf.printFile(req, res, next, chosenParams);
            res.json(req.chosen);
        }
    }),
);

module.exports = router;
