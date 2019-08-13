const express = require('express');
const router = express.Router();
const edit = require('../public/javascripts/edit-sqlite.js');

router.post("/",
    (req, res, next) => edit.hascred(req, res, next, '/editsettings'),
    (req, res) => edit.update(req, res, 'settings', '/editsettings'));

module.exports = router;
