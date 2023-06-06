const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');
const withAuth = require('../utils/withAuth');


// get all posts belonging to logged in user
router.get('/', withAuth, async (req, res) => {
    try {
        const blogPostData = await blogPost.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
            ],
        });

        const blogPosts = blogPostData.map((blogPost) => {
            const plainBlogPost = blogPost.get({ plain: true });
            plainBlogPost.isBlogOwner = plainBlogPost.user_id === req.session.user_id;
            return plainBlogPost;
        });
        // Set the logged_in status in the res.locals object
        res.locals.logged_in = req.session.logged_in || true;

        res.render('homepage', {
            
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;