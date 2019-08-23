const express = require('express');
const router = express.Router();
const edit = require('../public/javascripts/update-temperatures.js');
const pf = require('../public/javascripts/printFile.js');
const update = require('../public/javascripts/updateSensors.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/sensordetails.txt';

router.get("/",
    (req, res, next) => edit.update(req, res, next),
    (req, res, next) => pf.printFile(req, res, next, where, 'sensors'),
    (req, res, next) => update.updateSensors(req, res, next),
    (req, res) => show.show(req, res, 'message')
);

module.exports = router;
