const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../../models');


// get blogpost by id and show comments
router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await blogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: comments,
                    attributes: ['comment_body', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        const blogPostID = blogPostData.get({ plain: true });
        res.render('blogPost', {
            ...blogPostID,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
  
// this page displays data if the user is logged in
// get all blog posts for displaying on the dashboard plus comments
router.get('/', async (req, res) => {
    try { 
        const blogPostData = await blogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Blogcomment,
                    attributes: ['comment_body', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username'],
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
        console.log("error in dashboard route");
        res.status(500).json(err);
    }
});



module.exports = router;