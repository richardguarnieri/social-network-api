const { Thought, User } = require('./../models');

// GET all thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json({success: false, message: 'something went wrong...', error: err.message})
    }
};

// GET to get a single thought by its _id
const getThought = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        // validates if id parameter is a valid MongoDB ObjectId
        if (thoughtId.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${thoughtId} is not a valid ID!`})}
        const thought = await Thought.findOne({_id: thoughtId});
        // validates if thought is empty (null)
        if (!thought) {return res.status(400).json({success: false, message: `Thought with ID ${thoughtId} does not exist!`})}
        res.status(200).json(thought);
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// POST to create a new thought (pushes the created thought's _id to the associated user's thoughts array field)
const postThought = async (req, res) => {
    try {
        const { thoughtText, userId } = req.body;
        if (!thoughtText || !userId) {return res.status(400).json({success: false, message: `Empty / bad request!`})};
        if (userId.length !== 24) {return res.status(400).json({success: false, message: `Provided userId ${userId} is not a valid ID!`})};
        const user = await User.findOne({_id: userId});
        if (!user) {return res.status(400).json({success: false, message: `User with ID ${userId} does not exist!`})};
        const thought = await Thought.create({thoughtText, username: user.username});
        // push thought _id to user.thoughts array
        user.thoughts.push(thought._id);
        user.save();
        res.status(200).json({success: true, message: `Thought ID ${thought._id} has been created and added to User ID ${userId}!`});
    } catch (err) {
        res.status(500).json({success: false, message: 'something went wrong...', error: err.message})
    }
};

// PUT to update a thought by its _id
const updateThought = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        if (thoughtId.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${thoughtId} is not a valid ID!`})}
        const { thoughtText } = req.body;
        if (!thoughtText) {return res.status(400).json({success: false, message: `Empty request!`})}
        const thought = await Thought.findOne({_id: thoughtId});
        if (!thought) {return res.status(400).json({success: false, message: `Thought with ID ${thoughtId} does not exist!`})}
        if (thoughtText) {thought.thoughtText = thoughtText};
        thought.save()
        res.status(200).json({success: true, message: `Thought with ID ${thoughtId} has been successfully updated!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// DELETE to remove a thought by its _id
const deleteThought = async(req, res) => {
    try {
        const { thoughtId } = req.params;
        if (thoughtId.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${thoughtId} is not a valid ID!`})}
        const thought = await Thought.findOne({_id: thoughtId});
        if (!thought) {return res.status(400).json({success: false, message: `Thought with ID ${thoughtId} does not exist!`})}
        await Thought.deleteOne({_id: thoughtId});
        res.status(200).json({success: true, message: `Thought with ID ${thoughtId} has been successfully deleted!`});
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// POST to create a reaction stored in a single thought's reactions array field
const postThoughtReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        if (thoughtId.length !== 24) {return res.status(400).json({success: false, message: `Provided ID ${thoughtId} is not a valid ID!`})}
        // ******* instead of username should be userId, so we can look for the user and grab the username - better mechanics *******
        const { reactionBody, username } = req.body;
        if (!reactionBody || !username) {return res.status(400).json({success: false, message: `Empty request!`})}
        const thought = await Thought.findOne({_id: thoughtId});
        if (!thought) {return res.status(400).json({success: false, message: `Thought with ID ${thoughtId} does not exist!`})}
        thought.reactions.push({
            reactionBody,
            username,
        });
        thought.save();
        res.status(200).json({success: true, message: `Thought ID ${thoughtId} has been updated with a Reaction!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

// DELETE to pull and remove a reaction by the reaction's reactionId value
const deleteThoughtReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        if (thoughtId.length !== 24 || reactionId.length !== 24) {return res.status(400).json({success: false, message: `Provided IDs are not a valid IDs!`})}
        const thought = await Thought.findOne({_id: thoughtId});
        if (!thought) {return res.status(400).json({success: false, message: `Thought with ID ${thoughtId} does not exist!`})}
        // check if reactionId is already included in the thought.reactions list - first have to map to extract the ids
        const thoughtReactionsArray = thought.reactions.map(el => el._id.toString());
        if (!thoughtReactionsArray.includes(reactionId)) {return res.status(400).json({success: false, message: `Reaction ID ${reactionId} does not exist in Thought ID ${thoughtId}!`})}
        // filter out the reactionId from the thought.reactions array - toString() needed to convert from ObjectId to String to allow comparison
        thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
        thought.save();
        res.status(200).json({success: true, message: `Reaction ID ${reactionId} has been removed from Thought ID ${thoughtId}!`})
    } catch (err) {
        res.status(400).json({success: false, message: 'Something went wrong...', error: err.message})
    }
};

module.exports = {
    getThoughts, getThought, postThought, updateThought, deleteThought, postThoughtReaction, deleteThoughtReaction
};