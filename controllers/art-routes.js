const router = require("express").Router();
const { ArtPiece, Collection, User } = require("../models");
const sequelize = require("../config/connection");

router.get('/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }
        const theArtPiece = await ArtPiece.findOne({
            where: { id: req.params.id },
            include: [User, Collection]
        })
        const artPiece = theArtPiece.get({ plain: true });
        res.render('buyArtpage', { artPiece, loggedIn: req.session.loggedIn })
    } catch (error) {
        res.status(500);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await ArtPiece.update({
            user_id: req.session.userId,
            is_for_sale: false,
            collection_id: null
        },
            {
                where: {
                    id: req.params.id
                }
            })
        res.status(200).json('Bought!')

    } catch (error) {
        res.status(500);
    }
})

module.exports = router;