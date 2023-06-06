const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');
const withAuth = require('../utils/withAuth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
    try {
        const blogPostData = await blogPost.findAll({
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

        res.render('dashboard', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('login-signup');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;



// logged in route render

module.exports = router;