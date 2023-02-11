const chat = require("../socket");

// 로비
chat.on("connection", async (socket) => {
  socket.on("enterLobby", (nickname, cb) => {
    console.log(`${nickname} 로비 입장`);
    const msg = `${nickname} 님이 입장하셨습니다.`;
    const msgId = new Date().getTime().toString(36);
    chat.sockets.emit("receiveLobbyMsg", { notice: msg }, msgId);
    cb();
  });

  socket.on("sendLobbyMsg", (payload, cb) => {
    console.log("로비 채팅");
    console.log("payload:::", payload);
    const msgId = new Date().getTime().toString(36);
    chat.sockets.emit("receiveLobbyMsg", payload, msgId);
    cb();
  });

  // 방
  socket.on("enterRoomMsg", (roomNum, nickname, cb) => {
    console.log(`${nickname} ${roomNum}번 방 입장(enterRoomMsg)`);
    const msg = `${nickname} 님이 입장하셨습니다.`;
    const msgId = new Date().getTime().toString(36);
    chat.sockets.emit("receiveRoomMsg", { notice: msg }, msgId, roomNum);

    cb();
  });

  socket.on("leaveRoomMsg", (roomNum, nickname) => {
    console.log(`${nickname} ${roomNum}번 방 퇴장(leaveRoomMsg)`);
    const msg = `${nickname} 님이 퇴장하셨습니다.`;
    const msgId = new Date().getTime().toString(36);
    chat.sockets.emit("receiveRoomMsg", { notice: msg }, msgId, roomNum);
  });

  socket.on("sendRoomMsg", (payload, roomNum, cb) => {
    console.log("룸채팅");
    console.log("payload:::", payload);
    console.log(`roomNum::: ${roomNum}`);
    const msgId = new Date().getTime().toString(36);
    chat.sockets.emit("receiveRoomMsg", payload, msgId, roomNum);
    cb();
  });
});
