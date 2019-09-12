const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/all-tables.js');
const ah = require('./asynchandler');
const zonesParams = {table: "zones", what: 'zones'};

router.get('/:id?',
    ah.asyncHandler(async (req, res, next) => {
        await zones.getAll(req, res, next, zonesParams);
        if (req.zones) { res.json(req.zones); }
    })
);

module.exports = router;
