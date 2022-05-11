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
                artPosts,
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

router.get('/art/:id', async (req, res) => {
    ArtPiece.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['title', 'user_id', 'description', 'image', 'collection_id', 'is_for_sale', 'price'],
            includes: [{
                    model: Collection,
                    attributes: ['id', 'title', 'user_id'],
                    includes: {
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
            if (!artPiecesData) {
                res.status(404).json({
                    message: 'No posts found with this id'
                });
                return;
            }
            const artPiece = artPiecesData.get({
                plain: true
            });

            res.render('', {

            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


router.put("/art/:id", async (req, res) => {

});




module.exports = router;