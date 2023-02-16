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

  let roomName;
  socket.on('joinRoom', function (n) {
    socket.join(n);
    roomName = n;
    socket
      .in(roomName)
      .emit('joinNotice', `${socket.id} 님이 접속하셨네요. 할 일 없는 듯`);
    socket.in(roomName).emit('joinName', `${socket.id}`);
  });

  // 같은 방 입장한 회원 분류 roomID - socket.id
  // socket.on('join', function (message) {
  //   console.log(message);
  // });

  socket.on('disconnect', () => {
    socket.emit(`${socket.id}님은 우리 게임을 떠나셨어요.`);
  });
});

http.listen(4000, () => {
  console.log('Server port : ', 4000);
});
