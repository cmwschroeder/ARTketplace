const router = require('express').Router();
const { User, Collection, ArtPiece } = require('../../models');

router.get('/user/:id', async (req,res) => {
    const collectionData = await Collection.findAll({
        where: {user_id: req.params.id},
        include: [ArtPiece],
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true }));

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

//Get api/collection/:id
router.get("/:id", async (req, res) => {
    const specificCollection = await Collection.findOne({
        where: {
            id: req.params.id
        },
        include: [User, ArtPiece]
    });

    const theCollection = specificCollection.get({plain: true});
    res.json(theCollection);
})

module.exports = router;