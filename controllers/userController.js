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
        const { userId } = req.params;
        // validates if id parameter is a valid MongoDB ObjectId
        if (userId.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${userId} is not a valid ID!`})}
        const user = await User.findOne({_id: userId}).populate('friends');
        // validates if user is empty (null)
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${userId} does not exist!`})}
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// POST a new user
const postUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({username, email})
        res.status(200).json({success: true, message: `User with username: ${user.username} has been created!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// PUT to update a user by its _id
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${userId} is not a valid ID!`})}
        const { username, email } = req.body;
        if (!username && !email) {return res.status(400).json({success: false, message: `Empty request!`})}
        const user = await User.findOne({_id: userId});
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${userId} does not exist!`})}
        if (username) {user.username = username};
        if (email) {user.email = email};
        user.save()
        res.status(200).json({success: true, message: `User with ID ${userId} has been successfully updated!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// DELETE to remove user by its _id
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${userId} is not a valid ID!`})}
        const user = await User.findOne({_id: userId});
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${userId} does not exist!`})}
        await User.deleteOne({_id: userId});
        res.status(200).json({success: true, message: `User with ID ${userId} has been successfully deleted!`});
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// POST to add a new friend to a user's friend list
const postUserFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        if (userId.length !== 24 || friendId.length !== 24) {return res.status(400).json({success: false, message: `Provided IDs are not a valid IDs!`})}
        const user = await User.findOne({_id: userId});
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${userId} does not exist!`})}
        const friend = await User.findOne({_id: friendId});
        if (!friend) {return res.status(400).json({success: false, message: `User with ID ${friendId} does not exist!`})}
        // check if friendId is already included in the user's friend list
        if (user.friends.includes(friendId)) {return res.status(400).json({success: false, message: `User ID ${friendId} is already friends with User ID ${userId}!`})}
        user.friends.push(friendId);
        user.save();
        res.status(200).json({success: true, message: `User ID ${friendId} has been added to User ID ${userId} friends!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// DELETE to remove a friend from a user's friend list
const deleteUserFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        if (userId.length !== 24 || friendId.length !== 24) {return res.status(400).json({success: false, message: `Provided IDs are not a valid IDs!`})}
        const user = await User.findOne({_id: userId});
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${userId} does not exist!`})}
        const friend = await User.findOne({_id: friendId});
        if (!friend) {return res.status(400).json({success: false, message: `User with ID ${friendId} does not exist!`})}
        // check if friendId is already included in the user's friend list
        if (!user.friends.includes(friendId)) {return res.status(400).json({success: false, message: `User ID ${friendId} is not friends with User ID ${userId}!`})}
        // filter out the friendId from the user.friends array - toString() needed to convert from ObjectId to String to allow comparison
        user.friends = user.friends.filter(friend => friend.toString() !== friendId);
        user.save();
        res.status(200).json({success: true, message: `User ID ${friendId} has been removed from User ID ${userId} friends!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

module.exports = {
    getUsers, getUser, postUser, updateUser, deleteUser, postUserFriend, deleteUserFriend
};