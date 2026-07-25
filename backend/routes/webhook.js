const express = require('express');
const Task = require('../models/Task');
const Board = require('../models/Board');
const User = require('../models/User');

const router = express.Router();

router.post('/email', async (req, res) => {
  try {
    const { envelope, headers } = req.body;
    const subject = headers?.subject;

    const user = await User.findOne({ email: envelope.from });
    if (!user) {
      return res.status(200).json({ message: 'No matching user, ignored' });
    }

    let board = await Board.findOne({ owner: user._id });
    if (!board) {
      board = await Board.create({ name: 'Email Tasks', owner: user._id });
    }

    const task = await Task.create({ title: subject, board: board._id });

    const io = req.app.get('io');
    if (io) {
      io.to(user._id.toString()).emit('task:created', task);
    }

    res.status(200).json({ message: 'Task created from email', task });
  } catch (err) {
    console.error('Webhook email handler error:', err);
    res.status(200).json({ message: 'Error processing email, ignored' });
  }
});

module.exports = router;
