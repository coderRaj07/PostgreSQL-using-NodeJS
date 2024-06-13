const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { Sequelize } = require('sequelize');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts of a user
router.get('/:userId/posts', async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.findAll({ where: { userId } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get aggregated post count by user
router.get('/aggregate/post-count', async (req, res) => {
  try {
    const aggregatedData = await Post.findAll({
      attributes: [
        'userId',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'post_count']
      ],
      group: 'userId'
    });
    res.json(aggregatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
