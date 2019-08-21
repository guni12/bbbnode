const express = require('express');
const router = express.Router();
const codes = require('../public/javascripts/get-settings.js');
const show = require('../public/javascripts/showSpot.js');
const hub = require('../public/javascripts/hubinfo.js');
const print = require('../public/javascripts/printThis.js');

router.get("/:id?",
    (req, res, next) => codes.asksqlite(req, res, next, '/spotcal'),
    (req, res, next) => hub.hubinfo(req, res, next),
    (req, res, next) => print.printChosen(req, res, next),
    (req, res) => show.show(req, res)
);

module.exports = router;
