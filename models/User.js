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
        validate: {
            validator: function(email) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
            },
            message: 'Please add a valid email address.'
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
},
{
    versionKey: false
})

// define Model
const User = mongoose.model('User', userSchema);

module.exports = User;