const { Thought } = require('./../models');

// GET all thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughts = Thought.find();
        return thoughts.length ? res.status(200).json(thoughts) : res.status(500).json({success: false, message: 'no thoughts have been created...'})
    } catch (err) {
        res.status(500).json({success: false, message: 'something went wrong...', error: err.message})
    }
};

module.exports = {getThoughts, };