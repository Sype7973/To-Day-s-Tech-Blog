const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');


// router get for homepage get all blog posts
router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;