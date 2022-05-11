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

});

router.put('/artpiece/:id', async (req, res) => {


});

router.delete('/artpiece/:id', async (req, res) => {

    
});



module.exports = router;