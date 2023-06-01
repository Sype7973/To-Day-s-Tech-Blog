const router = require('express').Router();
const { User, blogPost, comments } = require('../models');

// GET one blog post for home page
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    try {
        const blogPostData = await blogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogPost = blogPostData.get({ plain: true });
        console.log(blogPost);
        const commentsData = await comments.findAll({
            where: {
                blogPost_id: blogPost.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const comments = commentsData.map((comment) => comment.get({ plain: true }));
        console.log(comments);
        res.render('blogPost', {
            blogPost,
            comments,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all blog posts for dashboard
router.get('/dashboard', async (req, res) => {
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
}
);
