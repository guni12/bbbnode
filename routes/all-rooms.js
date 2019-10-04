const express = require('express');
const router = express.Router();

const rooms = require('../public/javascripts/db/all-tables.js');
const ah = require('./asynchandler');
const roomsParams = {table: "rooms", what: 'rooms'};

router.get('/:id?',
    ah.asyncHandler(async (req, res, next) => {
        await rooms.getAll(req, res, next, roomsParams);
        if (req.rooms) { res.json(req.rooms); }
    })
);

module.exports = router;
