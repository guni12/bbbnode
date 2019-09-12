const express = require('express');
const router = express.Router();
const rf= require('../public/javascripts/readFile.js');
const init = require('../public/javascripts/init-zones.js');
const insert = require('../public/javascripts/insert-zones.js');
const where = './public/scripts/sensordetails.txt';
const params = { where: where, what: 'content' };
const ah = require('./asynchandler');

router.get("/",
    ah.asyncHandler(async (req, res, next) => {
        await rf.getFile(req, res, next, params);
        let check = await init.check(req, res, next);
        let last = check === undefined ?
            await insert.insert(req, res, next) :
            {"message": "Redan initierat"};

        res.json(last);
    }),
);

module.exports = router;
