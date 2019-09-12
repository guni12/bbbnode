const express = require('express');
const router = express.Router();
const rf = require('../public/javascripts/readFile.js');
const where = './public/scripts/controls.txt';
const params = { where: where, what: 'content' };
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await rf.getFile(req, res, next, params);
        res.status(200).json(JSON.parse(req.content));
    })
);

module.exports = router;
