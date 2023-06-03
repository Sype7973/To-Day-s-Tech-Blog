const router = require('express').Router();

const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentsApiRoutes');

router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;