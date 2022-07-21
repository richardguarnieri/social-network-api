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

// GET a single user by its _id and populated thought and friend data
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({_id: id}).populate('friends');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({success: false, message: 'something went wrong...', error: err.message})
    }
}

// POST a new user
const postUser = async (req, res) => {
    try {
        const { username, email, thoughts, friends } = req.body;
        const user = await User.create({username, email, thoughts, friends})
        res.status(200).json({success: true, message: `${user} has been created!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'something went wrong...', error: err.message})
    }
}

// PUT to update a user by its _id
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const user = await User.findOneAndUpdate(
            {_id: id},
            {$set: {username, email}},
            {runValidators: true, new: true}
        );
        res.status(200).json({success: true, message: `userId ${user.id} has been successfully updated!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'something went wrong...', error: err.message})
    }
}

// DELETE to remove user by its _id

module.exports = {
    getUsers, getUser, postUser, updateUser
}