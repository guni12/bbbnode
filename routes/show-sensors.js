const express = require('express');
const router = express.Router();
const sensors = require('../public/javascripts/db/all-tables.js');
const sensorsParams = {table: "sensors", what: 'sensors'};
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        await sensors.getAll(req, res, next, sensorsParams);
        if (req.sensors) { res.json(req.sensors); }
    }),
);

module.exports = router;
