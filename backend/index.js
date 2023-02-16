const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

const roomToUser = {}; // roomID - [user1(socekt.id) , user2(socekt.id), user3(socekt.id), ...]
const userToRoom = {}; // socket.id - roomID

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../frontend/src/components/Chatting.jsx');
});

io.on('connection', (socket) => {
  console.log('Server Socket Connected', socket.id);

  // 방 입장
  // 같은 방 입장한 회원 구분 roomID - socket.id
  socket.on('join room', (roomID) => {
    if (roomToUser[roomID]) {
      const length = roomToUser[roomID].length;
      if (length === 8) {
        socket.emit('room full');
        return;
      }
      roomToUser[roomID].push(socket.id);
    } else {
      roomToUser[roomID] = [socket.id];
    }
    userToRoom[socket.id] = roomID;

    // ----나중에 영상과 연결 시 사용
    // let rooms = io.sockets.adapter.rooms;
    // let room = rooms.get(roomID);
    // if (room === undefined) {
    //   socket.join(roomName);
    //   userToRoom[socket.id] = roomID;
    //   roomToUser[roomID] = [socket.id];
    // } else if (room.size <= 8) {
    //   socket.join(roomName);
    //   userToRoom[socket.id] = roomID;
    //   roomToUser[roomID].push(socket.id);
    // } else {
    //   socket.emit('room full');
    // }

    const usersInThisRoom = roomToUser[roomID].filter((id) => id !== socket.id);
    socket.emit('all users', usersInThisRoom);
  });

  socket.on('disconnect', () => {
    console.log('Server  Socket disconnected');

    // delete
  });
});

http.listen(4000, () => {
  console.log('Server port : ', 4000);
});
