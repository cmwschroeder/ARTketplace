const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');

//Get route for /collections
router.get('/', async (req, res) => {
    try {

    res.render("allCollection", {loggedIn: req.session.loggedIn});

    } catch (error) {
        res.status(500);
    }

});

router.get('/:id', async (req, res) => {


});

module.exports = router;