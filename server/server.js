const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const pablicPath = path.join(__dirname, '../public');

app.use(express.static(pablicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', (socet) => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
