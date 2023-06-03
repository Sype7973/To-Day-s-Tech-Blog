const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homePageRoutes');
const userPageRoutes = require('./userPageRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', userPageRoutes);

module.exports = router;