const { User } = require('../models');

const userData = [
    {
        name: 'User',
        password: 'password'
    },
    {
        name: 'CoolUser',
        password: 'password'
    },
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
});

module.exports = seedUsers;