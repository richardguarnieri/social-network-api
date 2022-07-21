const mongoose = require('mongoose');

// define Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /^([A-Za-z0-9]|[-._](?![-._])){3,20}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 12,
        validate: {
            validator: v => /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v),
            message: props => `${props.value} is not a valid email address.`
        }
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Thought',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }]
})

// virtuals
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// define Model
const User = mongoose.model('User', userSchema);

module.exports = User;