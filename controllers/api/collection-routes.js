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

module.exports = router;