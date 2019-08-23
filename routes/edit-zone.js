const express = require('express');
const router = express.Router();
const prep = require('../public/javascripts/prepare');
const edit = require('../public/javascripts/edit-sqlite.js');
const text = "Kolumn eller värde saknas";

router.post("/",
    (req, res, next) => prep.hascred(req, res, next, '/editzone', text),
    (req, res) => edit.update(req, res, 'zones', '/editzone'));

module.exports = router;
