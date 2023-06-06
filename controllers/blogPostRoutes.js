const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');
const withAuth = require('../utils/withAuth');


// to get to this route localhost:3001/blogPost/create recognises signed in status
// localhost:8080/blogpost/create
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
        include: [{model: User}]
      });
      // serialize data
      const uniqueBlogPost = blogPostData.get({ plain: true });

      const isBlogOwner = uniqueBlogPost.user_id === req.session.user_id;

      // comments array map
      const commentsData = await Blogcomment.findAll({
        where: { blogPost_id: req.params.id },
        include: [{ model: User }],
      });
      const commentsArray = commentsData.map((comment) => comment.get({ plain: true }));

      console.log(commentsArray);
  
      console.log(uniqueBlogPost);
      res.render('blogPost', {
        ...uniqueBlogPost,
        logged_in: req.session.logged_in,
        isBlogOwner,
        commentsArray,
        user_id: req.session.user_id,
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
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log('error in dashboard route');
        res.status(500).json(err);
    }
});

module.exports = router;