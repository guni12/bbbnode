const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.clearCookie('token');
    return res.status(200).json("loggade ut");
});

module.exports = router;
