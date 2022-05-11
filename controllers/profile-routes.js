const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

router.get('/', async (req, res) => {
    const artData = await ArtPiece.findAll({
        where: {user_id: 1} //where: {user_id: req.session.userId}
    });

    const artPieces = artData.map((art) => art.get({ plain: true}));

    res.render('profile', {
        loggedIn: req.session.loggedIn,
        artPieces: artPieces,
        userId: 1, //req.session.userId
    });
})
router.get('/artpiece/:id', async (req, res) => {

})

router.post('/artpiece', async (req, res) => {

})

router.put('/artpiece/:id', async (req, res) => {


})
router.delete('/artpiece/:id', async (req, res) => {

    
})



module.exports = router;