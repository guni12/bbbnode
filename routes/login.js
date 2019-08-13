const express = require('express');
const router = express.Router();

const login = require('../public/javascripts/login.js');
const prep = require('../public/javascripts/prepare.js');
const ask = require('../public/javascripts/ask-sqlite.js');

router.post("/",
    (req, res, next) => prep.hascred(req, res, next, "/login"),
    (req, res, next) => ask.asksqlite(req, res, next),
    (req, res, next) => ask.iserror(req, res, next),
    (req, res, next) => prep.isundefined(req, res, next),
    (req, res) => login.login(req, res)
);

module.exports = router;
