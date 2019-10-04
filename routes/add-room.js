const express = require('express');
const router = express.Router();
const add = require('../public/javascripts/db/add-room');
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await add.insert(req, res, next);
    })
);

module.exports = router;
