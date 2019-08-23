const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/get-settings.js');
const show = require('../public/javascripts/show.js');

router.get("/",
    (req, res, next) => settings.asksqlite(req, res, next, "/settings"),
    (req, res) => show.show(req, res, 'settings')
);

module.exports = router;
