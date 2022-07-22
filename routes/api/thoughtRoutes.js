const express = require('express');
const router = express.Router();
const { getThoughts, getThought, postThought, updateThought } = require('./../../controllers/thoughtController')

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(postThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)

// /api/thoughts/:thoughtId/reactions

module.exports = router;