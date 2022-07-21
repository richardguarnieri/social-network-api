const { User } = require('./../models');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getUsers
}