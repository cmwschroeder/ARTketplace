const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

router.get('/', async (req, res) => {
    const artData = await ArtPiece.findAll({
        where: {user_id: req.session.userId}
    });

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

    res.render('userArt', {
        loggedIn: req.session.loggedIn,
        collections: collections,
        newArt: true,
    });
});

router.get('/artpiece/:id', async (req, res) => {
    const collectionData = await Collection.findAll({
        where: {user_id: req.session.userId}
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true}));

    const artData = await ArtPiece.findByPk(req.params.id, {
        include: [Collection],
    });

    const artPiece = artData.get({ plain: true });

    for(let i = 0; i < collections.length; i++) {
        if(collections[i].title === artPiece.collection.title) {
            collections.splice(i, 1);
        }
    }

    res.render('userArt', {
        loggedIn: req.session.loggedIn,
        collections: collections,
        newArt: false,
        artPiece: artPiece,
        currCollection: artPiece.collection,
    });
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
                const collectionData = await Collection.create({
                    title: req.body.collection,
                    user_id: req.session.userId,
                })
                const newCollection = collectionData.get({ plain: true});
                collectionId = newCollection.id;
            }
            const artData = await ArtPiece.create({
                title: req.body.title,
                description: req.body.description,
                title: req.body.title,
                user_id: req.session.userId,
                image: req.body.imageLink,
                is_for_sale: req.body.forSale,
                price: req.body.price,
                collection_id: collectionId,
            });
        }
        else {
            const artData = await ArtPiece.create({
                title: req.body.title,
                description: req.body.description,
                title: req.body.title,
                user_id: req.session.userId,
                image: req.body.imageLink,
                is_for_sale: req.body.forSale,
                price: req.body.price,
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/artpiece/:id', async (req, res) => {
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
                const collectionData = await Collection.create({
                    title: req.body.collection,
                    user_id: req.session.userId,
                })
                const newCollection = collectionData.get({ plain: true});
                collectionId = newCollection.id;
            }
            await ArtPiece.update({
                title: req.body.title,
                description: req.body.description,
                title: req.body.title,
                user_id: req.session.userId,
                image: req.body.imageLink,
                is_for_sale: req.body.forSale,
                price: req.body.price,
                collection_id: collectionId,
            });
        }
        else {
            await ArtPiece.update({
                title: req.body.title,
                description: req.body.description,
                title: req.body.title,
                user_id: req.session.userId,
                image: req.body.imageLink,
                is_for_sale: req.body.forSale,
                price: req.body.price,
                collection_id: null,
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/artpiece/:id', async (req, res) => {

});



module.exports = router;