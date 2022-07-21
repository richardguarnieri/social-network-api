const connection = require('./../config/connection');
const seedUsers = require('./userSeed');

const seedData = async () => {
    await connection();
    await seedUsers();
}

seedData();