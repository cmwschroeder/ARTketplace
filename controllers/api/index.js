const router = require('express').Router();
const userRoutes = require('./user-routes');
const collectionRoutes = require('./collection-routes');

router.use('/users', userRoutes);
router.use('/collections', collectionRoutes);

module.exports = router;