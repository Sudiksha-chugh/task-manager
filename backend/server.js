const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

require('./config/passport');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://task-manager-ecru-chi-56.vercel.app'
    ]
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('join', (userId) => {
    socket.join(userId);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/boards');
const taskRoutes = require('./routes/tasks');
const passwordRoutes = require('./routes/password');
const webhookRoutes = require('./routes/webhook');

app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/webhook', webhookRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server on port ${PORT}`));
