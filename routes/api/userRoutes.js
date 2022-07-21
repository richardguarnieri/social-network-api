const express = require('express');
const router = express.Router();
const { getUsers, postUser } = require('./../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(postUser);

// /api/users/:id
router.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        const users = await User.find({ _id: id});
        res.send(users)
    })

module.exports = router;