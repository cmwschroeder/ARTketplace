const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

//Route that will render the profile page
router.get('/', async (req, res) => {
    //find all the art pieces the user owns so we can load the initial handlebar with those art pieces
    const artData = await ArtPiece.findAll({
        where: {user_id: req.session.userId}
    });

    const artPieces = artData.map((art) => art.get({ plain: true}));

    //render the page with the art pieces
    res.render('profile', {
        loggedIn: req.session.loggedIn,
        artPieces: artPieces,
        userId: req.session.userId,
    });
});

module.exports = router;