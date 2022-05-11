const { ArtPiece } = require('../models');

const artData = [
    {
        title: 'Painting of Cow',
        user_id: 1,
        description: 'its exactly what it sounds like',
        image: 'https://images.saatchiart.com/saatchi/5565/art/6358973/5428735-PRYHLOPB-7.jpg',
        collection_id: 1,
        is_for_sale: true,
        price: 100
    },
    {
        title: 'Painting of Dog',
        user_id: 1,
        description: 'its exactly what it sounds like',
        image: 'https://i.etsystatic.com/15952644/r/il/eadb70/1655832853/il_fullxfull.1655832853_1510.jpg',
        collection_id: 2,
        is_for_sale: true,
        price: 50

    },
    {
        title: 'Painting of Farley',
        user_id: 1,
        description: 'we love farley',
        image: 'https://i.etsystatic.com/15952644/r/il/d3eca4/1999692977/il_fullxfull.1999692977_f7q8.jpg',
        collection_id: 2,
        is_for_sale: true,
        price: 100
    },
];

const seedArt = () => ArtPiece.bulkCreate(artData, {
    
});

module.exports = seedArt;