const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

router.get('/', async (req, res) => {
    res.render('homePage', {
        loggedIn: req.session.loggedIn,
    });
})

router.get('/login', async (req, res) => {


})

router.get('/art/:id', async (req, res) => {


})

router.put("/art/:id", async (req, res) => {

}),




module.exports = router;





