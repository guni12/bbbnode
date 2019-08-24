const express = require('express');
const router = express.Router();
const register = require('../public/javascripts/register.js');
const prep = require('../public/javascripts/prepare.js');
const text = "Email eller lösenord saknas";
const params = { where: '/register', text: text };


router.post("/",
    (req, res, next) => prep.hascred(req, res, next, params),
    (req, res) => register.hashbcrypt(req, res));

module.exports = router;
