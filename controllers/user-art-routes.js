const router = require("express").Router();
const { ArtPiece, Collection, User } = require("../models");

//route that will render the page where we create a piece of art
router.get('/', async (req, res) => {
    //get the collections so that we can populate the select field in the handlebar page
    const collectionData = await Collection.findAll({
        where: {user_id: req.session.userId}
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true}));

    //when rendering the page pass the collections and tell the page that it is for a new art not an older art
    res.render('userArt', {
        loggedIn: req.session.loggedIn,
        collections: collections,
        newArt: true,
    });
});

//router that will render the update art page, will give collection info as well as the specific art info
router.get('/:id', async (req, res) => {
    //get the collections so that we can populate the select field in the handlebar page
    const collectionData = await Collection.findAll({
        where: {user_id: req.session.userId}
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true}));

    //get the art data for the id of the art passed in
    const artData = await ArtPiece.findByPk(req.params.id, {
        include: [Collection],
    });

    const artPiece = artData.get({ plain: true });

    //if we aren't logged in then we shouldn't be updating any art pieces
    if(!req.session.loggedIn) {
        res.redirect('/');
    }
    //if the user isn't the owner of this art piece then don't let them update it
    if(req.session.userId != artPiece.user_id) {
        res.redirect('/');
    }

    //logic to fill the collections selection field, if the current art doesn't have a collection then
    //tell the handlebar to not look for the current art's collection
    let hasCollection = false;

    //if it does then tell the handlebar as well as remove that collection from the list of collections since
    //the handlebar will treat that collection differently
    if(artPiece.collection != null) {
        hasCollection = true;
        for(let i = 0; i < collections.length; i++) {
            if(collections[i].title === artPiece.collection.title) {
                collections.splice(i, 1);
            }
        }
    }

    //render the same page as the adding an art page but tell it that it is for an older art
    res.render('userArt', {
        loggedIn: req.session.loggedIn,
        collections: collections,
        newArt: false,
        artPiece: artPiece,
        hasCollection: hasCollection,
        currCollection: artPiece.collection,
    });
});

//This route will take in a request body full of info on a new piece of art
router.post('/', async (req, res) => {
    try {
        //if we have a collection in this request body we will have to add it to our art piece
        if(req.body.hasCollection) {
            //find all the collections, since we will be decidiing if we need to create a new collection or add this art piece to an older collection
            const collectionData = await Collection.findAll({
                where: {user_id: req.session.userId}
            });
        
            const collections = collectionData.map((collection) => collection.get({ plain: true}));
    
            let collectionId = 0;
    
            //look through the collections and if we have a match save the id since that will be the collection we add this art piece to
            for(let i = 0; i < collections.length; i++) {
                if(collections[i].title === req.body.collection) {
                    collectionId = collections[i].id;
                }
            }
            //if we didn't have a collection that matches this collection then we will create a new collection
            if(collectionId === 0) {
                const collectionData = await Collection.create({
                    title: req.body.collection,
                    user_id: req.session.userId,
                })
                const newCollection = collectionData.get({ plain: true});
                //save the new collections id so we can add the art piece to that collection
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
        //if there is no collection then we can just simply add it to the database
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

//This route will take in a request body and update an art piece with that 
router.put('/:id', async (req, res) => {
    try {
        //if we have a collection in this request body we will have to add it to our art piece
        if(req.body.hasCollection) {
            //find all the collections, since we will be decidiing if we need to create a new collection or add this art piece to an older collection
            const collectionData = await Collection.findAll({
                where: {user_id: req.session.userId}
            });
        
            const collections = collectionData.map((collection) => collection.get({ plain: true}));
    
            let collectionId = 0;
    
            //look through the collections and if we have a match save the id since that will be the collection we add this art piece to
            for(let i = 0; i < collections.length; i++) {
                if(collections[i].title === req.body.collection) {
                    collectionId = collections[i].id;
                }
            }
            //if we didn't have a collection that matches this collection then we will create a new collection
            if(collectionId === 0) {
                const collectionData = await Collection.create({
                    title: req.body.collection,
                    user_id: req.session.userId,
                })
                const newCollection = collectionData.get({ plain: true});
                //save the new collections id so we can add the art piece to that collection
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
        //if there is no collection then we can just simply update it in the database
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

//This route will delete the art piece from the database
router.delete('/:id', async (req, res) => {
    try {
        //tell the db to destroy that art piece's row
        await ArtPiece.destroy({
            where: {
                id: req.params.id,
            }
        });
        //tell user that it worked
        res.json("Art deleted");
    } catch(err) {
        //will throw only if the id passed in isn't a art piece in the database, shouldn't show up from site
        res.status(500).json(err);
    }
});

module.exports = router;