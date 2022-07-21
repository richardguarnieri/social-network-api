const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser, updateUser } = require('./../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(postUser);

// /api/users/:id
router.route('/:id')
    .get(getUser)
    .put(updateUser)

module.exports = router;