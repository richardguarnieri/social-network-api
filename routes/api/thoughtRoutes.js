const express = require('express');
const router = express.Router();
const { getThoughts } = require('./../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)

module.exports = router;