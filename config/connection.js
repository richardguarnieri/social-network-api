const mongoose = require('mongoose');

const connectionStringURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network';

const main = async () => {
    try {
        await mongoose.connect(connectionStringURI);
        console.log('Mongoose connection successfull...');
    } catch (err) {
        console.log(err.message);
    }
}

main();

module.exports = mongoose;