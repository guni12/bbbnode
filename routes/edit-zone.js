const express = require('express');
const router = express.Router();
const edit = require('../public/javascripts/edit-sqlite.js');

router.post("/",
    (req, res, next) => edit.hascred(req, res, next, '/editzone'),
    (req, res) => edit.update(req, res, 'zones', '/editzone'));

module.exports = router;
