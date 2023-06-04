const router = require('express').Router();

// to get here, type localhost:8080/api/...
const blogPostRoutes = require('./blogPostApiRoutes');
const commentRoutes = require('./commentsApiRoutes');
const userPageRoutes = require('./userApiRoutes');

router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);
router.use('/user', userPageRoutes);

module.exports = router;