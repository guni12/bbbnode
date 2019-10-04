const express = require('express');
const router = express.Router();
const gpios = require('../public/javascripts/db/all-tables.js');
const gpiosParams = {table: "gpios", what: 'gpios'};
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        await gpios.getAll(req, res, next, gpiosParams);
        if (req.gpios) { res.json(req.gpios); }
    }),
);

module.exports = router;
