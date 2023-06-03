const router = require('express').Router();
const { User, blogPost, comments } = require('../models');
const withAuth = require('../utils/withAuth');

// this page displays data if the user is logged in
// get all blog posts for displaying on the dashboard plus comments
router.get('/', withAuth, async (req, res) => {
    try { 
        const blogPostData = await blogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: comments,
                    attributes: ['comment_text', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
            ],
        });
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        res.render('dashboard', {

            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;