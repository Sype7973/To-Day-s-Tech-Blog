const router = require('express').Router();
const { blogPost } = require('../../models');
const withAuth = require('../../utils/withAuth');

// this page allows the user to create, delete and update a new blog post if they are logged in
router.post('/', withAuth, async (req, res) => {
  try {
    // Code for creating a new blog post
    const newBlogPost = await blogPost.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost);
        console.log(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// updates a blog post if they are logged in e.g. localhost:8080/api/blogposts/1
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await blogPost.update(req.body, {
        where: {
            // make sure the id matches the session id
            // does this need to be req.session.user_id? or is it title/content?
            title: req.body.title,
            body: req.body.body,
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


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await blogPost.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
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

module.exports = router;