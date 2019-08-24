const express = require('express');
const router = express.Router();
const codes = require('../public/javascripts/get-settings.js');
const rf = require('../public/javascripts/readFile.js');
const hub = require('../public/javascripts/hubinfo.js');
const pf = require('../public/javascripts/printFile.js');
const show = require('../public/javascripts/show.js');
const where = './public/array.txt';
const params = { where: where };
const params1 = { where: where, what: 'chosen' };

router.get("/:id?",
    (req, res, next) => codes.asksqlite(req, res, next, '/spotcal'),
    (req, res, next) => rf.getFile(req, res, next, params),
    (req, res, next) => hub.hubinfo(req, res, next),
    (req, res, next) => pf.printFile(req, res, next, params1),
    (req, res) => show.show(req, res, 'chosen')
);

module.exports = router;
