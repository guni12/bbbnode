const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    console.log('Cookies: ', req.cookies);

    if (req.cookies && req.cookies.token) {
        res.json(req.cookies);
    } else {
        res.json("null");
    }
});

module.exports = router;
