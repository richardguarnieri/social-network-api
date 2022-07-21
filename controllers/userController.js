const { User } = require('./../models');

// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// GET a single user by its _id and populated thought and friend data
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        // validates if id parameter is a valid MongoDB ObjectId
        if (id.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${id} is not a valid ID!`})}
        const user = await User.findOne({_id: id}).populate('friends');
        // validates if user is empty (null)
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${id} does not exist!`})}
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// POST a new user
const postUser = async (req, res) => {
    try {
        const { username, email, thoughts, friends } = req.body;
        const user = await User.create({username, email, thoughts, friends})
        res.status(200).json({success: true, message: `${user} has been created!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// PUT to update a user by its _id
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${id} is not a valid ID!`})}
        const { username, email } = req.body;
        // const user = await User.findOneAndUpdate(
        //     {_id: id},
        //     {$set: {username, email}},
        //     {runValidators: true, new: true}
        // );
        const user = await User.findOne({_id: id});
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${id} does not exist!`})}
        if (username) {user.username = username};
        if (email) {user.email = email};
        user.save()
        res.status(200).json({success: true, message: `User with ID ${user.id} has been successfully updated!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// DELETE to remove user by its _id
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${id} is not a valid ID!`})}
        const user = await User.findOne({_id: id});
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${id} does not exist!`})}
        await User.deleteOne({_id: id});
        res.status(200).json({success: true, message: `User with ID ${id} has been successfully deleted!`});
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

module.exports = {
    getUsers, getUser, postUser, updateUser, deleteUser
}