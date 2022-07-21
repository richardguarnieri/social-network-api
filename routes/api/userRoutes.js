const express = require('express');
const router = express.Router();
const User = require('./../../models/User');

// /api/users
router.route('/')
    .get(async (req, res) => {
        const users = await User.find();
        res.send(users)
    })

// /api/users/:id
router.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        const users = await User.find({ _id: id});
        res.send(users)
    })

module.exports = router;