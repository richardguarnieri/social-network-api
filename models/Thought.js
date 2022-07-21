const mongoose = require('mongoose');

// define Schema
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: []
});

// virtuals
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// define Model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;