const router = require('express').Router();

// to get here, type localhost:8080/api/...
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentsApiRoutes');

router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;