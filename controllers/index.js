const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const userPageRoutes = require('./api/userApiRoutes');
const blogPostRoutes = require('./api/blogPostApiRoutes');

// get here by typing localhost:8080/api/...
router.use('/api', apiRoutes);
// get here by typing localhost:8080/...
router.use('/', dashboardRoutes);
// get here by typing localhost:8080/user/...
router.use('/user', userPageRoutes);
// get here by typing localhost:8080/blogposts/...
router.use('/blogposts', blogPostRoutes);

module.exports = router;