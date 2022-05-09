const { User } = require('../models');

const userData = [
    {
        name: 'User',
        email: 'user@email.com',
        password: 'password'
    },
    {
        name: 'CoolUser',
        email: 'cooluser@email.com',
        password: 'password'
    },
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
});

module.exports = seedUsers;