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

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/../frontend/src/pages/GamePage.jsx');
// });

io.on('connection', (socket) => {
  console.log('User Connected', socket.id);

  // 방 입장
  // 같은 방 입장한 회원 구분 roomID - socket.id
  socket.on('join room', (roomID) => {
    console.log('roomID: ', roomID);
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomID);

    console.log('roomSize: ', room?.size);

    if (room?.size > 8) {
      socket.emit('room full');
      return;
    } else {
      room
        ? roomToUser[roomID].push(socket.id)
        : (roomToUser[roomID] = [socket.id]);
      socket.join(roomID);
      userToRoom[socket.id] = roomID;
      console.log('usersInfo: ', roomToUser[roomID]);

      io.to(roomID).emit('notice', {
        msg: `${socket.id}님이 입장하셨습니다.`,
        roomToUser: roomToUser[roomID],
      });
      // User 입장 시 개인 welcome msg
      io.to(`${socket.id}`).emit('getDM', {
        from_id: 'admin',
        to_id: socket.id,
        msg: `Hello, ${socket.id}`,
      });
    }

    // if (roomToUser[roomID]) {
    //   const length = roomToUser[roomID].length;
    //   if (length === 8) {
    //     socket.emit('room full');
    //     return;
    //   }
    //   roomToUser[roomID].push(socket.id);
    // } else {
    //   roomToUser[roomID] = [socket.id];
    // }

    console.log('rooms :', rooms);
    console.log('room :', room);
    console.log('userToRoom:', userToRoom);
    console.log('roomToUser:', roomToUser);

    // ----나중에 영상과 연결 시 사용

    const usersInThisRoom = roomToUser[roomID]?.filter(
      (id) => id !== socket.id
    );
    socket.broadcast.to(roomID).emit('usersInThisRoom', usersInThisRoom);
  });

  // User의 chat 수신 - 전체 전송
  socket.on('sendChat', (data) => {
    io.to(userToRoom[data.from_id]).emit('getChat', {
      from_id: data.from_id,
      msg: data.msg,
    });
  });

  socket.on('reqUserList', (data) => {
    io.to(userToRoom[data.from_id]).emit('getUserList', {
      userList: roomToUser[userToRoom[data.from_id]],
    });
  });

  // DM 수신 후 전송 (보낸 user, 받는 user both)
  socket.on('sendDM', (data) => {
    io.to(`${data.to_id}`).to(`${data.from_id}`).emit('getDM', {
      from_id: data.from_id,
      to_id: data.to_id,
      msg: data.msg,
    });
  });

  socket.emit('sendJoinMessage', socket.id);

  let checkReady = {};
  socket.on('gameReady', (data) => {
    let roomID = userToRoom[data.from_id];
    let length = roomToUser[roomID].length;
    checkReady[roomID] === length
      ? io.to(roomID).emit('readyComplete')
      : checkReady[roomID]
      ? (checkReady[roomID] += 1)
      : (checkReady[roomID] = 0);
  });

  // 방장이 gameStart 누름
  socket.on('gameStart', (data) => {
    io.to(userToRoom[data.from_id]).emit('gameStart');
  });

  socket.on('disconnect', () => {
    let roomID = userToRoom[socket.id];
    console.log('dis1 roomToUser[roomID]: ', roomToUser[roomID]);

    io.to(roomID).emit('notice', {
      msg: `${socket.id}님이 퇴장하셨습니다.`,
      roomToUser: roomToUser[roomID],
    });

    roomToUser[socket.id]?.length > 1
      ? (roomToUser[roomID] = roomToUser[roomID].filter((e) => {
          console.log(e, socket.id);
          return e !== socket.id;
        }))
      : delete roomToUser[socket.id];

    console.log('dis2 roomToUser[roomID]: ', roomToUser[roomID]);
    console.log('User Disconnected :' + socket.id);
    // console.log('check:', userToRoom[socket.id]?.slice(0, -2));
    socket.leave(roomID, socket.id);
    delete userToRoom[socket.id];
  });
});

http.listen(4000, () => {
  console.log('Server port : ', 4000);
});
