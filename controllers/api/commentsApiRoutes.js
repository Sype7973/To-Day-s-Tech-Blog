const router = require('express').Router();
const { Blogcomment, User, blogPost } = require('../../models');
const withAuth = require('../../utils/withAuth');


// get all comments not render just create json data
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
    res.status(200).json(commentData);
  } catch (err) {
    console.log('error in dashboard route');
    res.status(500).json(err);
  }
});

// get comments by id do not render
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
    const uniqueComment = commentData.get({ plain: true });
    console.log(uniqueComment);
    res.status(200).json(uniqueComment);
  } catch (err) {
    console.log('error in dashboard route');
    console.log(err);
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
  try { console.log(req.body, req.params);
    const commentData = await Blogcomment.update({comment_body: req.body.content}, {
      where: {
        id: req.params.id,
      },
    });
    console.log("!!!!!!!!!",commentData);
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
    const commentData = await Blogcomment.destroy({
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
