const express = require('express');
const router = express.Router();
const init = require('../public/javascripts/init-zones.js');

router.get("/",
    (req, res, next) => init.init(req, res, next),
    (req, res, next) => init.check(req, res, next),
    (req, res) => init.insert(req, res)
);

module.exports = router;
