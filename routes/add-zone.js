const express = require('express');
const router = express.Router();
const prep = require('../public/javascripts/prepare');
const insert = require('../public/javascripts/add-zone');

router.post("/",
    (req, res, next) => prep.hascred(req, res, next, '/addzone', "Data saknas"),
    (req, res) => insert.insert(req, res));

module.exports = router;
