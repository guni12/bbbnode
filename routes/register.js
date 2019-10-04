const express = require('express');
const router = express.Router();
//const register = require('../public/javascripts/login/register.js');
//const prep = require('../public/javascripts/prepare.js');
const prep = require('../public/javascripts/login/prepare.js');
//const text = "Email eller lösenord saknas";
//const params = { where: '/register', text: text };
const ah = require('./asynchandler');


router.post("/",
    ah.asyncHandler(async (req, res, next) => {
        await prep.register(req, res, next);
        //await register.hashbcrypt(req, res)
    })
);

module.exports = router;
