const express = require('express');
const router = express.Router();
const del = require('../public/javascripts/db/delete-sqlite.js');
const ah = require('./asynchandler');

router.get("/:id?",
    ah.asyncHandler(async (req, res, next) => {
        del.deleteItem(req, res, next, "sensors");
    })
);

module.exports = router;
