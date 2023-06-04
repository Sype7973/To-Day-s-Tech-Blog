const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../../models');


// this page displays data if the user is logged in
// get all blog posts for displaying on the dashboard plus comments
// router.get('/', async (req, res) => {
//     try { 
//         const blogPostData = await blogPost.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: Blogcomment,
//                     attributes: ['comment_body', 'date_created', 'user_id'],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 },
//             ],
//         });
//         const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
//         res.render('dashboard', {

//             blogPosts,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         console.log("error in dashboard route");
//         res.status(500).json(err);
//     }
// });
// get blogpost by id and show comments
// router.get('/:id', async (req, res) => {
//     try {
//         const blogPostData = await blogPost.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: comments,
//                     attributes: ['comment_body', 'date_created', 'user_id'],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 },
//             ],
//         });
//         const blogPostID = blogPostData.get({ plain: true });
//         res.render('blogPost', {
//             ...blogPostID,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });



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
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  



module.exports = router;