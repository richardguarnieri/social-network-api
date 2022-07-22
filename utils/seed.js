const connection = require('./../config/connection');
const seedUsers = require('./userSeed');
const seedThoughts = require('./thoughtSeed');

const seedData = async () => {
    await connection();
    await seedUsers();
    await seedThoughts();
    process.exit();
}

seedData();