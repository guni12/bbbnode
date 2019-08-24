const express = require('express');
const router = express.Router();

const zones = require('../public/javascripts/all-tables.js');
const show = require('../public/javascripts/show.js');
const params = {table: "zones", where: './zones', what: 'zones'};

router.get('/:id?',
    (req, res, next) => zones.getAll(req, res, next, params),
    (req, res) => show.show(req, res, 'zones')
);

module.exports = router;
