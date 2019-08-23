const express = require('express');
const router = express.Router();
const rf = require('../public/javascripts/readFile.js');
const show = require('../public/javascripts/show.js');
const where = './public/scripts/gpiodetails.txt';

router.get("/",
    (req, res, next) => rf.getFile(req, res, next, where),
    (req, res) => show.show(req, res, 'content')
);

module.exports = router;
