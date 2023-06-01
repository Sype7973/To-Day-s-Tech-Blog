const router = require('express').Router();
const { User, blogPost, comments } = require('../models');
const withAuth = require('../utils/withAuth');

// GET all blog posts for dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const blogPostData = await blogPost.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogPost = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        console.log(blogPost);
        res.render('dashboard', {
            blogPost,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

