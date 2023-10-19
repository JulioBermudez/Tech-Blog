const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/posts/
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//http://localhost:3001/api/posts/:id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const postData = await Post.findByPk({
      id,
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
