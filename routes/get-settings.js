const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/get-settings.js');

router.get("/",

    (req, res, next) => settings.asksqlite(req, res, next, "/settings"),
    (req, res) => settings.show(req, res)
);

module.exports = router;
