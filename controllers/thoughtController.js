const { Thought } = require('./../models');

// GET all thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        return thoughts.length ? res.status(200).json(thoughts) : res.status(500).json({success: false, message: 'no thoughts have been created...'})
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

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
const postThought = async (req, res) => {
    try {
        const { thoughtText, username } = req.body;
        const thought = await Thought.create({
            thoughtText,
            // createdAt,
            username,
            // reactions: {
            //     reactionId,
            //     reactionBody,
            //     username,
            //     createdAt
            // }
        })
        res.status(200).json({success: true});
    } catch (err) {
        res.status(500).json({success: false, message: 'something went wrong...', error: err.message})
    }
}

module.exports = {getThoughts, getThought, postThought};