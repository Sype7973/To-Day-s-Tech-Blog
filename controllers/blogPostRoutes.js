const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');
const withAuth = require('../utils/withAuth');


// to get to this route localhost:3001/blogPost/create recognises signed in status
router.get('/create', withAuth, async (req, res) => {
    try {
        res.render('newBlogPost', {
            logged_in: req.session.logged_in,
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get blogpost by id and have comments
router.get('/:id', withAuth, async (req, res) => {
    try {
      const blogPostData = await blogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Blogcomment,
            attributes: ['id', 'comment_body', 'user_id', 'blogPost_id', 'date_created'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      });
      const uniqueBlogPost = blogPostData.get({ plain: true });
      console.log(uniqueBlogPost);
      res.render('blogPost', {
        ...uniqueBlogPost,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log('error in dashboard route');
      console.log(err);
      res.status(500).json(err);
    }
  });


router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await blogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const UpdateblogPost = blogPostData.get({ plain: true });
        res.render('editBlogPost', {
            ...UpdateblogPost,
        });
    } catch (err) {
        console.log('error in dashboard route');
        res.status(500).json(err);
    }
});

module.exports = router;