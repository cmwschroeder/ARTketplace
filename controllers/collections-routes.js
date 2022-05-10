const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

//Get route for /collections
router.get('/', async (req, res) => {
    try {
        const allCollections = await ArtPiece.findAll({
            include: [User, Collection]
        });
        const theCollections = allCollections.map((collection) => collection.get({ plain: true }));

        res.render("allCollection", {theCollections, loggedIn: req.session.loggedIn})
    } catch (error) {
        res.status(500);
    }


});

router.get('/:id', async (req, res) => {


});

module.exports = router;