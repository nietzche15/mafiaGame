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

  socket.emit('joinNotice', `${socket.id} 님이 접속하셨네요. 할일없는듯`);
  // 같은 방 입장한 회원 분류 roomID - socket.id
  // socket.on('join', function (message) {
  //   console.log(message);
  // });

  socket.on('disconnect', () => {
    console.log(`${socket.id}님과 연결이 끊어졌어요.`);
    // delete
  });
});

http.listen(4000, () => {
  console.log('Server port : ', 4000);
});
