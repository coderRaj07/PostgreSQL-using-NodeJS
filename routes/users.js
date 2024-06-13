const express = require('express');
const cron = require('node-cron');
const router = express.Router();
const { User, Post } = require('../models');
const { Sequelize, Op, fn, col, where, literal} = require('sequelize');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get aggregated user data (e.g., average age by city)
router.get('/aggregate/age', async (req, res) => {
  try {
    const aggregatedData = await User.findAll({
      where: {
        city: {
          [Op.ne]: "City22"
        }
      },
      attributes: [
        'city',
        [fn('AVG', col('age')), 'average_age'],      // [fn("aggregate function", col("column name"), "alias"]
        [fn('MAX', col('createdAt')), 'latest_created_at']
      ],
      group: 'city',
      having: where(fn('AVG', col('age')), '>', 40),  //use where in having, for aggregate function
      order: literal('average_age DESC')     //use literal in order by, for user defined field 
    });
    res.json(aggregatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 // post a user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(204).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a user by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/log', (req, res) => {
  cron.schedule('*/6 * * * * *', () => {
    console.log('Logging every 6 seconds');
  });

  res.send('Started logging every 6 seconds');
});


module.exports = router;
