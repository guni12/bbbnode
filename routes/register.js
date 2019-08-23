const express = require('express');
const router = express.Router();
const register = require('../public/javascripts/register.js');
const prep = require('../public/javascripts/prepare.js');
const text = "Email eller lösenord saknas";


router.post("/",
    (req, res, next) => prep.hascred(req, res, next, "/register", text),
    (req, res) => register.hashbcrypt(req, res));

module.exports = router;
