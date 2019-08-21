const express = require('express');
const router = express.Router();
const gpios = require('../public/javascripts/get-gpios.js');

router.get("/",
    (req, res) => gpios.getall(req, res)
);

module.exports = router;
