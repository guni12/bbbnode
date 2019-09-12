const express = require('express');
const router = express.Router();
const rf = require('../public/javascripts/readFile.js');
const change = require('../public/javascripts/gpio/update-gpio.js');
const updl = require('../public/javascripts/gpio/upd-gpio-list.js');
const pf = require('../public/javascripts/printFile.js');
const where = './public/scripts/gpiodetails.txt';
const getGpiosParams = { where: where, what: 'content' };
const updateParams = { item: 'updated', list: 'content' };
const printParams = { where: where, what: 'newlist' };
const ah = require('./asynchandler');

router.post("/",
    ah.asyncHandler(async (req, res, next) => {
        await rf.getFile(req, res, next, getGpiosParams);
        await change.update(req, res, next);
        if (req.updated) {
            await updl.updateList(req, res, next, updateParams);
            await pf.printFile(req, res, next, printParams);

            res.json(req.newlist);
        }
    })
);

module.exports = router;


