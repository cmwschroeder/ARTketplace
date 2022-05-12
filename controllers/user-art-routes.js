const router = require("express").Router();
const { ArtPiece, Collection, User } = require("../models");

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    const collectionData = await Collection.findAll({
        where: {user_id: req.session.userId}
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true}));

    const artData = await ArtPiece.findByPk(req.params.id, {
        include: [Collection],
    });

    const artPiece = artData.get({ plain: true });

    if(!req.session.loggedIn) {
        res.redirect('/');
    }
    if(req.session.userId != artPiece.user_id) {
        res.redirect('/');
    }

    let hasCollection = false;

    if(artPiece.collection != null) {
        hasCollection = true;
        for(let i = 0; i < collections.length; i++) {
            if(collections[i].title === artPiece.collection.title) {
                collections.splice(i, 1);
            }
        }
    }

    res.render('userArt', {
        loggedIn: req.session.loggedIn,
        collections: collections,
        newArt: false,
        artPiece: artPiece,
        hasCollection: hasCollection,
        currCollection: artPiece.collection,
    });
});

router.post('/', async (req, res) => {
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
        res.json("Art created");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
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
            }, 
            {
                where: {
                    id: req.params.id,
                }
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
            }, 
            {
                where: {
                    id: req.params.id,
                }
            });
        }
        res.json("Art updated");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ArtPiece.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.json("Art deleted");
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;