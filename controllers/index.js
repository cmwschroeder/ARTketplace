const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const collectionRoutes = require('./collection-routes.js');
const profileRoutes = require('./profile-routes.js')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/collections', collectionRoutes);
router.use('/profile', profileRoutes);



module.exports = router;
