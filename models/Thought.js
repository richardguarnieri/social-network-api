const mongoose = require('mongoose');

// define reactionSchema
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectID,
        default: mongoose.Types.ObjectID,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// define thoughtSchema
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
    reactions: [reactionSchema]
});

// virtuals
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// define Model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;