const express = require('express');
const router = express.Router();

const codes = require('../public/javascripts/get-settings.js');
const cal = require('../public/javascripts/spotcal.js');
const hub = require('../public/javascripts/hubinfo.js');

router.get("/",
    (req, res, next) => codes.asksqlite(req, res, next, '/spotcal'),
    (req, res, next) => hub.hubinfo(req, res, next),
    (req, res, next) => cal.printChosen(req, res, next),
    (req, res) => cal.show(req, res)
);

router.get("/:id",
    (req, res, next) => codes.asksqlite(req, res, next, '/spotcal'),
    (req, res, next) => hub.hubinfo(req, res, next),
    (req, res, next) => cal.printChosen(req, res, next),
    (req, res) => cal.show(req, res)
);

module.exports = router;
