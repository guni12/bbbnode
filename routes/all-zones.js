const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/all-zones.js');

router.get("/",
    (req, res, next) => zones.getAllZones(req, res, next),
    (req, res) => zones.show(req, res)
);

router.get('/:id',
    (req, res, next) => zones.getOneZone(req, res, next),
    (req, res) => zones.show(req, res)
);

module.exports = router;
