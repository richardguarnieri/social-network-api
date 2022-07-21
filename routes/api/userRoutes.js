const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser, updateUser, deleteUser } = require('./../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(postUser);

// /api/users/:id
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;