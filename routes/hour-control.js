const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/getOneRow.js');
const rf = require('../public/javascripts/readFile.js');
const calc = require('../public/javascripts/hour-control/spotcal.js');
const zones = require('../public/javascripts/all-tables.js');
const control = require('../public/javascripts/hour-control/hour-control.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/gpiodetails.txt';
const today = './public/scripts/array.txt';
const params = { where: today, what: 'content' };
const params1 = { where: where, what: 'prep_gpiodetails' };
const params2 = { where: where, what: 'gpiodetails' };
const zoneparams = { table: 'zones', where: './zones', what: 'zones' };
const settingsparams = { table: 'settings', where: './settings', what: 'settings' };

router.get("/:id?",
    (req, res, next) => settings.getOne(req, res, next, settingsparams),
    (req, res, next) => rf.getFile(req, res, next, params),
    (req, res, next) => calc.tocontrol(req, res, next),
    (req, res, next) => zones.getAll(req, res, next, zoneparams),
    (req, res, next) => rf.getFile(req, res, next, params1),
    (req, res, next) => control.update(req, res, next),
    (req, res, next) => rf.getFile(req, res, next, params2),
    (req, res) => show.show(req, res, 'gpiodetails')
);

module.exports = router;
