const express = require('express');
const router = express.Router();
const edit = require('../public/javascripts/update-temperatures.js');

router.get("/",
    (req, res) => edit.update(req, res));

module.exports = router;
