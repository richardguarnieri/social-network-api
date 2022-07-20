const mongoose = require('mongoose');

const connectionStringURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network';

const connection = async () => {
    await mongoose.connect(connectionStringURI);
    console.log('Mongoose connection successfull...');
}

module.exports = connection;