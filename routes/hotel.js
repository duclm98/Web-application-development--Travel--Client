const express = require('express');
const router = express.Router();
const hotel = require('../controllers/hotel');

router.get('/info/:id', hotel.info);

module.exports = router;