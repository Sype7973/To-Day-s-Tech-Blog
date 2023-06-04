const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');

// this page displays data even if the user is not logged in
// get all blog posts for displaying on the dashboard, but no comments and only the body of the blog post
// login get route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login-signup');
});

// logout get route
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

// router to create a new user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
//   router to login
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
//   router to logout
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


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
        console.log(blogPostData);
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        console.log(blogPosts);
        res.render('dashboard', {
            blogPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;