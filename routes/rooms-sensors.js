const express = require('express');
const router = express.Router();

const rooms = require('../public/javascripts/db/rooms-sensors.js');
const ah = require('./asynchandler');

router.get('/:id?',
    ah.asyncHandler(async (req, res, next) => {
        await rooms.leftJoin(req, res, next);
        if (req.rooms) { res.json(req.rooms); }
    })
);

module.exports = router;
