const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');

// Login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('login-signup');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

// // User registration route
// router.post('/', async (req, res) => {
//     try {
//         const userData = await User.create(req.body);

//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;

//             res.status(200).json(userData);
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });



// Dashboard route
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

        // Set the logged_in status in the res.locals object
        res.locals.logged_in = req.session.logged_in || false;

        res.render('dashboard', {
            blogPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;