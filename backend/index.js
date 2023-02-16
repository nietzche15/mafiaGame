const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

let nickNameList = { admin: 'Server' };

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../frontend/src/components/Chatting.jsx');
});

io.on('connection', (socket) => {
  console.log('Server Socket Connected', socket.id);

  // 같은 방 입장한 회원 분류 roomID - socket.id
  socket.on('join', function (roomID) {
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomID);
  });

  socket.on('disconnect', () => {
    console.log('Server  Socket disconnected');

    // delete
  });
});

http.listen(4000, () => {
  console.log('Server port : ', 4000);
});
