const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');
// const withAuth = require('../utils/auth');


// get all blogposts
router.get('/all', async (req, res) => {
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

        res.render('BlogPostsAll', {
            blogPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// to get to this route localhost:3001/blogPost/create

router.get('/create', async (req, res) => {
    try {
        res.render('newBlogPost');
    } catch (err) {
        console.log('error in dashboard route');
        res.status(500).json(err);
    }
});

// get blogpost by id and have comments
router.get('/:id', async (req, res) => {
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
      });
    } catch (err) {
      console.log('error in dashboard route');
      console.log(err);
      res.status(500).json(err);
    }
  });


router.get('/edit/:id', async (req, res) => {
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