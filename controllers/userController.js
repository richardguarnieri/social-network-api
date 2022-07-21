const { User } = require('./../models');

// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({success: false, message: 'something went wrong...', error: err.message})
    }
}

// GET one user
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find({_id: id});
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({success: false, message: 'something went wrong...', error: err.message})
    }
}

// POST a new user
const postUser = async (req, res) => {
    try {
        const { username, email, thoughts, friends } = req.body;
        console.log(username, email, thoughts, friends)
        const user = await User.create({
            username,
            email,
            thoughts,
            friends,
        })
        res.status(200).json({success: true, message: `${user} has been created!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'something went wrong...', error: err.message})
    }
}

module.exports = {
    getUsers, getOneUser, postUser
}