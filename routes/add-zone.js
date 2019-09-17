const express = require('express');
const router = express.Router();
const prep = require('../public/javascripts/prepare');
const insert = require('../public/javascripts/db/add-zone');
const params = { where: '/addzone', text: "Data saknas" };

router.post("/",
    (req, res, next) => prep.hascred(req, res, next, params),
    (req, res, next) => insert.insert(req, res, next));

module.exports = router;
