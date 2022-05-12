const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const collectionRoutes = require('./collections-routes');
const profileRoutes = require('./profile-routes.js');
const artRoutes = require('./art-routes.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/collections', collectionRoutes);
router.use('/profile', profileRoutes);
router.use('/art', artRoutes);



module.exports = router;
