const connection = require('./../config/connection');
const seedUsers = require('./userSeed');
const seedThoughts = require('./thoughtSeed');
const { User, Thought } = require('./../models');

const seedData = async () => {
    await connection();
    await User.deleteMany();
    console.log('\n----- USER COLLECTION HAS BEEN WIPED! -----');
    await Thought.deleteMany();
    console.log('\n----- THOUGHT COLLECTION HAS BEEN WIPED! -----');
    await seedUsers();
    console.log('\n----- USERS SEEDED SUCCESSFULLY! -----');
    await seedThoughts();
    console.log('\n----- THOUGHTS SEEDED SUCCESSFULLY! -----\n');
    process.exit();
}

seedData();