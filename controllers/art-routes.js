const router = require("express").Router();
const { ArtPiece, Collection, User } = require("../models");
const sequelize = require("../config/connection");

router.get('/:id', async (req, res) => {
    try {
        console.log("yoooooooooooooooooooooo---------------------------------------");
        const theArtPiece = await ArtPiece.findOne({
            where: {id: req.params.id},
            include: [User,Collection]
        })
        const artPiece = theArtPiece.get({plain:true});
        console.log("------------------------------------" + artPiece + "-----------------------------------------------");
        res.render('buyArtpage', {artPiece, loggedIn: req.session.loggedIn})
    } catch (error) {
      res.status(500);
    }
  });

module.exports = router;