const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/all-zones.js');
const show = require('../public/javascripts/show.js');

router.get("/",
    (req, res, next) => zones.getAllZones(req, res, next),
    (req, res) => show.show(req, res, 'zones')
);

router.get('/:id',
    (req, res, next) => zones.getOneZone(req, res, next),
    (req, res) => show.show(req, res, 'zones')
);

module.exports = router;
