const router = require('express').Router();
const { blogPost, User, Blogcomment } = require('../../models');
const withAuth = require('../../utils/withAuth');

// this page allows the user to create, delete and update a new blog post if they are logged in
router.post('/', async (req, res) => {
  try {
    // Code for creating a new blog post
    const newBlogPost = await blogPost.create({
        ...req.body,
        user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put('/:id',  async (req, res) => {
  try {
    const blogPostData = await blogPost.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    if (!blogPostData[0]) {
        res.status(404).json({ message: 'No blog post found with this id!' });
        return;
    }
    res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
  try {
    const blogPostData = await blogPost.destroy({
        where: {
            id: req.params.id,
        },
    });
    if (!blogPostData) {
        res.status(404).json({ message: 'No blog post found with this id!' });
        return;
    }
    res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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
// to get to this route localhost:3001/api/blogposts/create
router.get('/create', async (req, res) => {
    try {
        res.render('newBlogPost');
    } catch (err) {
        console.log('error in dashboard route');
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