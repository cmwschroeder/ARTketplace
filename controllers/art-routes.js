const router = require("express").Router();
const { ArtPiece, Collection, User } = require("../models");
const sequelize = require("../config/connection");

router.get('/:id', async (req, res) => {
    try {
        const artPiece = await ArtPiece.findOne({
            where: {id: req.params.id},
            include: [User,Collection]
        })
        artPiece = artPiece.get({plain:true});
        res.render('buyArtpage', {theArtPiece, loggedIn: req.session.loggedIn})
    } catch (error) {
      res.status(500);
    }
  });

module.exports = router;