const express = require('express');
const router = express.Router();
const prep = require('../public/javascripts/prepare');
const edit = require('../public/javascripts/edit-sqlite');
const text = "Kolumn eller värde saknas";
const params = { where: '/editsettings', text: text };
const params2 = { table: 'settings', where: '/editsettings' };

router.post("/",
    (req, res, next) => prep.hascred(req, res, next, params),
    (req, res, next) => edit.update(req, res, next, params2 ),
    (req, res) => res.json(req.content)
);

module.exports = router;
