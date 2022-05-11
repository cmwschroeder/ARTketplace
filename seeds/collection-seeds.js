const { Collection } = require('../models');

const collectionData = [
    {
        title: "Manuel",
        user_id: "1"
    },
    {
        title: 'favorites',
        user_id: 1  
    },
    {
        title: 'paintings i hate',
        user_id: 2 
    },
        
];

const seedCollection = () => Collection.bulkCreate(collectionData, {
});

module.exports = seedCollection;