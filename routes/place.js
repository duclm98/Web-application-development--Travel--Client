const express = require('express');
const router = express.Router();
const place = require('../controllers/place');

router.get('/info/:id', place.info);

router.post('/comment/:id', place.comment);

module.exports = router;