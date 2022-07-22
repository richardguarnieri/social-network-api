const express = require('express');
const router = express.Router();
const { getThoughts, getThought, postThought, updateThought, deleteThought, postThoughtReaction } = require('./../../controllers/thoughtController')

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(postThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(postThoughtReaction)

module.exports = router;