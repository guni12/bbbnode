const express = require('express');
const router = express.Router();
const rf = require('../public/javascripts/readFile.js');
const where = './public/scripts/gpiodetails.txt';
const params = { where: where, what: 'content' };
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await rf.getFile(req, res, next, params);
        res.json(JSON.parse(req.content));
    })
);

module.exports = router;
