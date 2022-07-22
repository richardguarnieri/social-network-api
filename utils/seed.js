const connection = require('./../config/connection');
const seedUsers = require('./userSeed');
const seedThoughts = require('./thoughtSeed');
const { User, Thought } = require('./../models');

const seedData = async () => {
    await connection();
    await User.deleteMany();
    await Thought.deleteMany();
    await seedUsers();
    await seedThoughts();
    process.exit();
}

seedData();