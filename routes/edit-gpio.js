const express = require('express');
const router = express.Router();
const edit = require('../public/javascripts/db/edit-gpio');
const change = require('../public/javascripts/gpio/update-gpio.js');
const text = "Kolumn eller värde saknas";
const params = { where: 'editgpio', text: text };
const ah = require('./asynchandler');


router.post("/",
    ah.asyncHandler(async (req, res, next) => {
        await edit.hascred(req, res, next, params);
        await change.update(req, res, next);
        if (req.updated) {
            edit.update(req, res, next);

            res.json(req.updated);
        }
    })
);

module.exports = router;
