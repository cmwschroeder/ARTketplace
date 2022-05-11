const router = require('express').Router();
const { ArtPiece, Collection, User } = require('../models');
const sequelize = require('../config/connection')

//Get route for /collections
router.get('/', async (req, res) => {
    try {

    res.render("allCollection", {loggedIn: req.session.loggedIn});

    } catch (error) {
        res.status(500);
    }

        

    
})
    

router.get('/:id', (req, res) => {
    Collection.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'user_id', 'description', 'collection_id'],
        include: [
            {
                model: Collection,
                attributes: ['id', 'title', 'user_id', 'description', 'collection_id'],
                include: {
                    model: ArtPiece,
                    attributes: ['id', 'title', 'user_id', 'description']
                }
            },
            {
                model: User,
                attributes: ['id', 'name', 'user_id',]
            }
        ]
    })
    .then(collectionDbData => {
        if (!collectionDbData) {
            res.status(404).json({message: 'No Collection found with this id'});
            return;
        }
        const collection = collectionDbData.get({played: true})
        res.render('singleCollection',{
            collection
        });
    })
  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  });    
    router.post('/', (req, res) => {
        Collection.create({
            title: req.body.title,
            user_id: req.session.user_id
        })
        .then(collectionDbData => res.json(collectionDbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
router.put('/:id', (req, res) => {
    Collection.update({
        title: req.body.title,
        // update with artpiece id
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(collectionDbData => {
        if(!collectionDbData) {
            res.status(404).json({ message: 'No collection data found with this id'});
            return;
        }
        res.json(collectionDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
<<<<<<< HEAD
=======

router.delete('/:id',(req, res) =>{
    Collection.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(collectionDbData => {
        if (!collectionDbData) {
            res.status(404).json({ message: 'No collection found with this id'});
            return;
        }
        res.json(collectionDbData)
    })

})
>>>>>>> 4860948 (update collection route with)

router.delete('/:id',(req, res) =>{
    Collection.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(collectionDbData => {
        if (!collectionDbData) {
            res.status(404).json({ message: 'No collection found with this id'});
            return;
        }
        res.json(collectionDbData)
    })
})
module.exports = router;