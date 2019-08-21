const express = require('express');
const router = express.Router();
const register = require('../public/javascripts/register.js');
const prep = require('../public/javascripts/prepare.js');


router.post("/",
    (req, res, next) => prep.hascred(req, res, next, "/register"),
    (req, res) => register.hashbcrypt(req, res));

module.exports = router;
