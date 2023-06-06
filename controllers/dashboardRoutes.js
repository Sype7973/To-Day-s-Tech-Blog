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
                    attributes: ['username'],
                },
            ],
        });
        console.log(blogPostData);
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        console.log(blogPosts);

        // Set the logged_in status in the res.locals object
        res.locals.logged_in = req.session.logged_in || false;

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



// logged in route render

module.exports = router;