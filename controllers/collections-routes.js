const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

//Get route for /collections
router.get('/', async (req, res) => {
    try {
        const allArts = await ArtPiece.findAll({
            include: [User, Collection]
        });
        const theArtworks = allArts.map((art) => art.get({ plain: true }));

        const allCollections = await Collection.findAll({
            include: [ArtPiece]
        })
        const theCollections = allCollections.map((collection) => collection.get({plain: true}));
    

    res.render("allCollection", {theArtworks, theCollections, loggedIn: req.session.loggedIn});

    } catch (error) {
        res.status(500);
    }

        


});

router.get('/:id', async (req, res) => {


});

module.exports = router;