const express = require('express');
const router = express.Router();
const settings = require('../public/javascripts/getOneRow.js');
const show = require('../public/javascripts/show.js');
const params = {table: "settings", where: './settings', what: 'settings'};

router.get("/",
    (req, res, next) => settings.getOne(req, res, next, params),
    (req, res) => show.show(req, res, 'settings')
);

module.exports = router;
