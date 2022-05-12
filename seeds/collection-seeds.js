const { Collection } = require('../models');

const collectionData = [
    {
        title: "Manuel",
        user_id: 2
    },
    {
        title: 'Favorites',
        user_id: 1  
    },
    {
        title: 'Paintings I Hate',
        user_id: 2 
    },
        
];

const seedCollection = () => Collection.bulkCreate(collectionData, {
});

module.exports = seedCollection;