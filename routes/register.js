const express = require('express');
const router = express.Router();
const prep = require('../public/javascripts/login/prepare.js');
const ah = require('./asynchandler');


router.post("/",
    ah.asyncHandler(async (req, res, next) => {
        await prep.register(req, res, next);
    })
);

module.exports = router;
