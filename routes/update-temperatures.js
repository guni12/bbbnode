const express = require('express');
const router = express.Router();
const edit = require('../public/javascripts/update-temperatures.js');

router.get("/",
    (req, res, next) => edit.update(req, res, next),
    (req, res, next) => edit.printFile(req, res, next),
    (req, res) => edit.updateSqlite(req, res)
);

module.exports = router;
