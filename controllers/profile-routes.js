const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

router.get('/', async (req, res) => {
    const artData = await ArtPiece.findAll({
        where: {user_id: req.session.userId}
    });

    console.log(req.session.userId);

    const artPieces = artData.map((art) => art.get({ plain: true}));

    res.render('profile', {
        loggedIn: req.session.loggedIn,
        artPieces: artPieces,
        userId: req.session.userId,
    });
});

router.get('/artpiece/', async (req, res) => {
    const collectionData = await Collection.findAll({
        where: {user_id: req.session.userId}
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true}));

    var areCollections = false;
    if(collections.length > 0) {
        areCollections = true;
    }

    res.render('userArt', {
        loggedIn: req.session.loggedIn,
        collections: collections,
        areCollections: areCollections,
        newArt: true,
    });
});

router.get('/artpiece/:id', async (req, res) => {
    
});


router.post('/artpiece', async (req, res) => {
    try {
        if(req.body.hasCollection) {
            const collectionData = await Collection.findAll({
                where: {user_id: req.session.userId}
            });
        
            const collections = collectionData.map((collection) => collection.get({ plain: true}));
    
            let collectionId = 0;
    
            for(let i = 0; i < collections.length; i++) {
                if(collections[i].title === req.body.collection) {
                    collectionId = collections[i].id;
                }
            }
            if(collectionId === 0) {
                
            }
        }

        // const artData = await ArtPiece.create({
        //     title: req.body.title,
        //     description: req.body.description,
        //     title: req.body.title,
        //     user_id: req.session.userId,
        //     image: req.body.image,
        //     is_for_sale: req.body.forSale,
        //     price: req.body.price,
        // });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/artpiece/:id', async (req, res) => {


});

router.delete('/artpiece/:id', async (req, res) => {

    
});



module.exports = router;