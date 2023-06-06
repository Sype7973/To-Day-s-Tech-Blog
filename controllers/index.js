const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentsRoutes = require('./commentsRoutes');

// get here by typing localhost:8080/api/...
router.use('/api', apiRoutes);
// get here by typing localhost:8080/...
router.use('/', dashboardRoutes);
// get here by typing localhost:8080/blogPost/...
router.use('/blogPosts', blogPostRoutes);
// get here by typing localhost:8080/comments/...
router.use('/comments', commentsRoutes);




module.exports = router;