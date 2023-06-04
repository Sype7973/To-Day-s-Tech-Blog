const router = require('express').Router();
const { Blogcomment, User, blogPost } = require('../../models');
const withAuth = require('../../utils/withAuth');

// this page allows the user to create, delete and update comments if they are logged in
// get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Blogcomment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: blogPost,
          attributes: ['title'],
        },
      ],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.render('dashboard', {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log('error in dashboard route');
    res.status(500).json(err);
  }
});

// get comments by id
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Blogcomment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: blogPost,
          attributes: ['title'],
        },
      ],
    });
    const comment = commentData.get({ plain: true });
    res.render('blogPost', {
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log('error in dashboard route');
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newComment = await Blogcomment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const commentData = await comments.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await comments.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
