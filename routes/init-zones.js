const express = require('express');
const router = express.Router();
const rf= require('../public/javascripts/readFile.js');
const init = require('../public/javascripts/init-zones.js');
const insert = require('../public/javascripts/insert-zones.js');
const where = './public/scripts/sensordetails.txt';

router.get("/",
    (req, res, next) => rf.getFile(req, res, next, where),
    (req, res, next) => init.check(req, res, next),
    (req, res) => insert.insert(req, res)
);

module.exports = router;
