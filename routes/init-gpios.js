const express = require('express');
const router = express.Router();
const pins = require('../public/javascripts/gpio/initPins.js');
const ig = require('../public/javascripts/gpio/initGpios.js');
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await pins.initPins(req, res, next);
        if (req.printPins) {
            await ig.insert(req, res, next);
            res.json(req.printPins);
        }
    }),
);

module.exports = router;

