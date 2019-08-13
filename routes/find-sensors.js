const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/find-sensors.js');

router.get("/",
    (req, res) => zones.getAllZones(req, res)
);

module.exports = router;
