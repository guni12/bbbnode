const express = require('express');
const router = express.Router();
const rf = require('../public/javascripts/readFile.js');
let where = './public/scripts';
const params = { where: where, what: 'content' };
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        params.where = where + req.originalUrl + '.txt';
        await rf.getFile(req, res, next, params);
        res.status(200).json(JSON.parse(req.content));
    })
);

module.exports = router;
