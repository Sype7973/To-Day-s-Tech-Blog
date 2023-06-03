const router = require('express').Router();
const { User, blogPost, comments } = require('../models');

// this page displays data even if the user is not logged in
// get all blog posts for displaying on the dashboard, but no comments and only the body of the blog post
router.get('/dashboard', async (req, res) => {
    try {
        const blogPostData = await blogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        res.render('dashboard', {
            blogPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;