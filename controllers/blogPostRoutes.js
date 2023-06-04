const router = require('express').Router();
const { blogPost, User, comments } = require('../models');


// get all blogposts
router.get('/', async (req, res) => {
    try {
        const blogPostData = await blogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
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


// get blogpost by id
router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await blogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blogPost = blogPostData.get({ plain: true });
        res.render('blogPost', {
            ...blogPost,
        });
    } catch (err) {
        console.log('error in dashboard route');
        res.status(500).json(err);
    }
});