const { Thought } = require('./../models');

const seedThoughts = async () => {
    await Thought.create(
        {_id: '62d9733226bfdf20564153a1', thoughtText: 'A sledgehammer to crack a nut', username: 'richardguarnieri'},
        {_id: '62d9733226bfdf20564153a2', thoughtText: 'The birds and the bees', username: 'kevinralo', reactions: {reactionBody: 'Oh, great!!!', username: 'camilazagal'}},
        {_id: '62d9733226bfdf20564153a3', thoughtText: 'All things come to those who wait', username: 'daniellago', reactions: {reactionBody: 'Awesome!', username: 'camilazagal'}},
        {_id: '62d9733226bfdf20564153a4', thoughtText: 'A skeleton in the closet', username: 'erendiramendoza', reactions: {reactionBody: 'I really liked this one!', username: 'kevinralo'}},
        {_id: '62d9733226bfdf20564153a5', thoughtText: 'The road less travelled', username: 'camilazagal', reactions: {reactionBody: 'That was cool!', username: 'daniellago'}},
    )
};

module.exports = seedThoughts;