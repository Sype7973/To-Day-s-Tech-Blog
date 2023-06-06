const router = require('express').Router();
const { User, blogPost, Blogcomment } = require('../models');
const withAuth = require('../utils/withAuth');

// comment edit
router.get('/edit/:id', async (req, res) => {
    try {
        const commentData = await Blogcomment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
            ],
        });

        const comment = commentData.get({ plain: true });

        res.render('editComment', {
            ...comment,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

module.exports = router;