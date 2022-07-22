const { Thought } = require('./../models');

const seedThoughts = async () => {
    await Thought.create(
        {_id: '62d9733226bfdf20564153a1', thoughtText: 'thought text 1', username: 'example2'},
        {_id: '62d9733226bfdf20564153a2', thoughtText: 'thought text 2', username: 'example3', reactions: {reactionBody: 'reaction body 1', username: 'example2'}},
        {_id: '62d9733226bfdf20564153a3', thoughtText: 'thought text 3', username: 'example4', reactions: {reactionBody: 'reaction body 2', username: 'example3'}},
        {_id: '62d9733226bfdf20564153a4', thoughtText: 'thought text 4', username: 'example5', reactions: {reactionBody: 'reaction body 3', username: 'example4'}},
    )
};

module.exports = seedThoughts;