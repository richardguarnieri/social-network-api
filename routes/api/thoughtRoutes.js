const express = require('express');
const router = express.Router();
const { getThoughts, getThought, postThought } = require('./../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)
    .post(postThought);

router.route('/:thoughtId')
    .get(getThought)

module.exports = router;