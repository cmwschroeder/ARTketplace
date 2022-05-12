const router = require('express').Router();
const {
    ArtPiece,
    Collection,
    User
} = require('../models');

router.get('/', async (req, res) => {
    ArtPiece.findAll({
            attributes: ['title', 'user_id', 'description', 'image', 'collection_id', 'is_for_sale', 'price'],
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
        })
        .then(artPiecesData => {
            const artPosts = artPiecesData.map(artPiece => artPiece.get({
                plain: true
            }));
            res.render('homePage', {
                artPieces: artPosts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');

})

router.get('/sort', async (req, res) => {
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

// listen to filter option and get the route data
const artfilter = document.querySelector(".filter-price")
artfilter.addEventListener('change', () => {
            //test route for filter 
            router.get('/filter', async (req, res) => {
                const artDb = await ArtPiece.findAll({
                    //find ALL item title by price range
                    attributes: ['title'],
                    where: {
                        price: 50 - 200
                    },
                })
                const artFilters = artDb.map((art) => art.get({
                    plain: true
                }));
                res.render('homePage', {
                    artFilters,
                    loggedIn: req.session.session
                })
            })
        })




        module.exports = router;