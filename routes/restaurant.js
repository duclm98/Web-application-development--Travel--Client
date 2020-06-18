const express = require('express');
const router = express.Router();
const restaurant = require('../controllers/restaurant');

router.get('/info/:id', restaurant.info);

module.exports = router;