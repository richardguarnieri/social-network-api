const { User } = require('./../models');

const seedUsers = async () => {
    await User.create(
        {_id: '62d9733226bfdf20564153f1', username: 'example1', email: 'example1@example.com'},
        {_id: '62d9733226bfdf20564153f2', username: 'example2', email: 'example2@example.com', thoughts: '62d9733226bfdf20564153a1', friends: '62d9733226bfdf20564153f1'},
        {_id: '62d9733226bfdf20564153f3', username: 'example3', email: 'example3@example.com', thoughts: '62d9733226bfdf20564153a2', friends: '62d9733226bfdf20564153f1'},
        {_id: '62d9733226bfdf20564153f4', username: 'example4', email: 'example4@example.com', thoughts: '62d9733226bfdf20564153a3', friends: '62d9733226bfdf20564153f2'},
        {_id: '62d9733226bfdf20564153f5', username: 'example5', email: 'example5@example.com', thoughts: '62d9733226bfdf20564153a4', friends: '62d9733226bfdf20564153f3'},
    )
};

module.exports = seedUsers;