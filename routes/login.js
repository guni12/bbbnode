const express = require('express');
const router = express.Router();

const login = require('../public/javascripts/login/login.js');
const prep = require('../public/javascripts/prepare.js');
const email = require('../public/javascripts/db/sql-email.js');
const text = "Email eller lösenord saknas";
const params = { where: '/login', text: text };

router.post("/",
    (req, res, next) => prep.hascred(req, res, next, params),
    (req, res, next) => email.asksqlite(req, res, next),
    (req, res, next) => email.iserror(req, res, next),
    (req, res, next) => prep.isundefined(req, res, next),
    (req, res) => login.login(req, res)
);

module.exports = router;
