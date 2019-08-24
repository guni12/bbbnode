const express = require('express');
const router = express.Router();
//const codes = require('../public/javascripts/get-settings.js');
const settings = require('../public/javascripts/getOneRow.js');
const rf = require('../public/javascripts/readFile.js');
const hub = require('../public/javascripts/hubinfo.js');
const pf = require('../public/javascripts/printFile.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/array.txt';
const params = { where: where, what: 'content' };
const params1 = { where: where, what: 'chosen' };
const settingsparams = { table: 'settings', where: './settings', what: 'settings' };

router.get("/:id?",
    (req, res, next) => settings.getOne(req, res, next, settingsparams),
    (req, res, next) => rf.getFile(req, res, next, params),
    (req, res, next) => hub.hubinfo(req, res, next),
    (req, res, next) => pf.printFile(req, res, next, params1),
    (req, res) => show.show(req, res, 'chosen')
);

module.exports = router;
