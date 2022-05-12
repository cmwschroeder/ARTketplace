const { Op } = require("sequelize");
const router = require('express').Router();
const {
    ArtPiece,
    Collection,
    User
} = require('../models');

router.get('/', async (req, res) => {
    try {
        const artPiecesData = await ArtPiece.findAll({
            attributes: ['id', 'title', 'user_id', 'description', 'image', 'collection_id', 'is_for_sale', 'price'],
            include: [{
                model: Collection,
                attributes: ['id', 'title', 'user_id'],
                include: {
                    model: User,
                    attributes: ['id', 'name']
                }
            },
            {
                model: User,
                attributes: ['id', 'name']
            }
            ]
        });

        const artPosts = artPiecesData.map(artPiece => artPiece.get({ plain: true }));

        res.render('homePage', {
            artPieces: artPosts,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');

})
// high to low sort route
router.get('/sort/high', async (req, res) => {
    // find all artPieces and place form high to low base on price 
    const artData = await ArtPiece.findAll({
        order: [
            ["price", "DESC"],
            ["title", "ASC"],
        ],
    })
    const artPieces = artData.map((art) => art.get({
        plain: true
    }));
    res.render('homePage', {
        artPieces,
        loggedIn: req.session.loggedIn
    })
})
//low to high  sort route
router.get('/sort/low', async (req, res) => {
    // find all artPieces and place form low to high base on price 
    const artData = await ArtPiece.findAll({
        order: [
            ["price", "ASC"],
            ["title", "ASC"],
        ],
    })
    const artPieces = artData.map((art) => art.get({
        plain: true
    }));
    res.render('homePage', {
        artPieces,
        loggedIn: req.session.loggedIn
    })
})
// filter routes
router.get('/filter/:max/:min', async (req, res) => {
    // find all artpiece that fit it the price range that was selected
    const artData = await ArtPiece.findAll({
        where: {
            price: {
                [Op.between]: [req.params.min, req.params.max]
            }
        }
    })
    // send it to homepage all the price range artpiece
    const artPieces = artData.map((art) => art.get({ plain: true }))
    res.render('homePage', {
        artPieces,
        loggedIn: req.session.loggedIn
    })
});
// search bar route
router.get('/search/:title', async (req, res) => {
    // find all artpieces with the title that user search
    const artData = await ArtPiece.findAll({
        where: {
            title: req.params.title,
        }
    });
// send into homepage with all the info that need and get rid of other
    const artPieces = artData.map((art) => art.get({ plain: true }));

    res.render('homePage', {
        artPieces,
        loggedIn: req.session.loggedIn,
    });
});



module.exports = router;