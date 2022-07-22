const { User } = require('./../models');

const seedUsers = async () => {
    await User.create(
        {_id: '62d9733226bfdf20564153f1', username: 'richardguarnieri', email: 'richardguarnieri@example.com', thoughts: '62d9733226bfdf20564153a1',friends: ['62d9733226bfdf20564153f2', '62d9733226bfdf20564153f3', '62d9733226bfdf20564153f4', '62d9733226bfdf20564153f5']},
        {_id: '62d9733226bfdf20564153f2', username: 'kevinralo', email: 'kevinralo@example.com', thoughts: '62d9733226bfdf20564153a2', friends: ['62d9733226bfdf20564153f1', '62d9733226bfdf20564153f3', '62d9733226bfdf20564153f4', '62d9733226bfdf20564153f5']},
        {_id: '62d9733226bfdf20564153f3', username: 'daniellago', email: 'daniellago@example.com', thoughts: '62d9733226bfdf20564153a3', friends: ['62d9733226bfdf20564153f1', '62d9733226bfdf20564153f2', '62d9733226bfdf20564153f4', '62d9733226bfdf20564153f5']},
        {_id: '62d9733226bfdf20564153f4', username: 'erendiramendoza', email: 'erendiramendoza@example.com', thoughts: '62d9733226bfdf20564153a4', friends: ['62d9733226bfdf20564153f1', '62d9733226bfdf20564153f2', '62d9733226bfdf20564153f3', '62d9733226bfdf20564153f5']},
        {_id: '62d9733226bfdf20564153f5', username: 'camilazagal', email: 'camilazagal@example.com', thoughts: '62d9733226bfdf20564153a5', friends: ['62d9733226bfdf20564153f1', '62d9733226bfdf20564153f2', '62d9733226bfdf20564153f3', '62d9733226bfdf20564153f4']},
    )
};

module.exports = seedUsers;