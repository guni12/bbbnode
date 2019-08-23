const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/all-zones.js');
const show = require('../public/javascripts/show.js');

router.get('/:id?',
    (req, res, next) => zones.getZones(req, res, next),
    (req, res) => show.show(req, res, 'zones')
);

module.exports = router;
