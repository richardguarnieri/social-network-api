const mongoose = require('mongoose');

// define Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
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
        ref: 'thought',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: this,
    }]
})

// virtuals
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// define Model
const User = mongoose.model('User', userSchema);

module.exports = User;