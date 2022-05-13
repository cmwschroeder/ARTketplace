const router = require('express').Router();
const { User, Collection, ArtPiece } = require('../../models');

//Gets and returns all the collections that a user owns
router.get('/user/:id', async (req,res) => {
    //find all the collections this user owns based off the id of the user passed in
    const collectionData = await Collection.findAll({
        where: {user_id: req.params.id},
        include: [ArtPiece],
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true }));

    //return a list of the collections
    res.json(collections);
});

//Get api/collections
router.get('/', async (req,res) => {
    const collectionData = await Collection.findAll({
        include: [ArtPiece, User],
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true }));

    res.json(collections);
});


module.exports = router;