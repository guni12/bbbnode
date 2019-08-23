const express = require('express');
const router = express.Router();
const codes = require('../public/javascripts/get-settings.js');
const rf = require('../public/javascripts/readFile.js');
const hub = require('../public/javascripts/hubinfo.js');
const print = require('../public/javascripts/printFile.js');
const show = require('../public/javascripts/show.js');
const where = './public/array.txt';

router.get("/:id?",
    (req, res, next) => codes.asksqlite(req, res, next, '/spotcal'),
    (req, res, next) => rf.getFile(req, res, next, where),
    (req, res, next) => hub.hubinfo(req, res, next),
    (req, res, next) => print.printFile(req, res, next, where, 'chosen'),
    (req, res) => show.show(req, res, 'chosen')
);

module.exports = router;
