const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/db/getOneRow.js');
const settingsParams = {table: "settings", what: 'settings'};
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await settings.getOne(req, res, next, settingsParams);
        res.json(req.settings);
    })
);

module.exports = router;
