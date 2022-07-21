const { User } = require('./../models');

const seedUsers = async () => {
    await User.create(
        {username: 'example1', email: 'example1@example.com', thoughts: 'wqe', friends: 'qe'},
        {username: 'example2', email: 'example2@example.com', thoughts: 'wqed', friends: 'qed'},
    )
};

module.exports = seedUsers;