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

module.exports = router;