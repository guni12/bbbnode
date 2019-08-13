const express = require('express');
const router = express.Router();
const insert = require('../public/javascripts/add-zone.js');

router.post("/",
    (req, res, next) => insert.hascred(req, res, next),
    (req, res) => insert.insert(req, res));

module.exports = router;
