const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser } = require('./../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(postUser);

// /api/users/:id
router.route('/:id')
    .get(getUser)

module.exports = router;