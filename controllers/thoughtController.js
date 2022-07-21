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

// POST a thought
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

module.exports = {getThoughts, postThought};