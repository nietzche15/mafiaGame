module.exports = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  let cnt = 2;
  const getJobList = require('./jobList');
  let jobList = {};
  let checkReady = {};
  let roomList = {
    0: {
      roomID: 0,
      roomName: '☆*: .｡. o(≧▽≦)o .｡.:*☆ 마놀ㄱ',
      roomLocked: false,
      roomPW: false,
      roomOwner: 'admin',
    },
    1: {
      roomID: 1,
      roomName: '▧▧▧▶▷용강중 2-3◁◀▨▨▨ →→ㅂㅂ 방학식 §§',
      roomLocked: true,
      roomPW: 1234,
      roomOwner: 'admin',
    },
    2: {
      roomID: 2,
      roomName: '༼ つ ◕_◕ ༽つ 해보자 해보자 후회하지 말고 💪💪',
      roomLocked: true,
      roomPW: 1234,
      roomOwner: 'admin',
    },
  };
  const emailToSocket = {}; // email - {userID : socket.id, userName: nickName }
  const socketToEmail = {}; // socket.id - email
  const friendList = {};
  const roomToUser = {}; // roomID - [user1(socekt.id) , user2(socekt.id), user3(socekt.id), ...]
  const userToRoom = {}; // socket.id - roomID

  /**
   * 방별 타이머 상태
   * [key : roomId] : Timer
   * Timer : {
   *   ms: 설정시간(밀리세컨드)
   *   type : 타이머 타입()
   * }
   */
  const roomTimer = {};
  const timerList = require('./timerList');

  io.on('connection', (socket) => {
    console.log('User Connected', socket.id);

    //----------------------------------------------// Lobby Page

    socket.on('setUserInfo', (data) => {
      emailToSocket[data.user_email] = {
        userID: data.user_id,
        userName: data.user_name,
      };
      socketToEmail[data.user_id] = data.user_email;

      console.log('emailToSocket: ', emailToSocket[data.user_email]);
      console.log('userID: ', emailToSocket[data.user_email].userID);
      console.log('userName: ', emailToSocket[data.user_email].userName);
      console.log('userImg: ', data.user_img);
      console.log('socketToEmail: ', socketToEmail[data.user_id]);

      io.emit('noticeLB', {
        msg: `${data.user_name}님이 입장했습니다.`,
        emailToSocket: emailToSocket,
        socketToEmail: socketToEmail,
      });
    });
    // Lobby에 보일 방 목록 전송
    io.emit('allRooms', {
      roomList: roomList,
    });
    console.log('roomList:', roomList);

    // 새로 만든 방 정보 목록에 추가
    // 추가된 방 목록 Lobby로 전송
    // 방 roomID 는 cnt로 autoIncrement
    socket.on('newRoomInfo', (data) => {
      cnt++;
      // let roomID = cnt;
      roomList[cnt] = {
        roomID: cnt,
        roomName: data.room_name,
        roomLocked: data.room_locked,
        roomPW: data.room_PW,
        roomOwner: data.room_owner,
      };
      console.log('roomList[cnt]:', roomList[cnt]);
      io.emit('allRooms', {
        roomList: roomList,
      });
    });

    socket.on('sendLBChat', (data) => {
      let from_email = socketToEmail[data.from_id];
      let from_name = emailToSocket[data.from_email].userName;
      console.log('data', data);
      console.log('from_email:', from_email);
      console.log('from_name:', from_name);
      io.emit('getLBChat', {
        from_id: data.from_id,
        from_name: data.from_name || '익명',
        msg: data.msg,
      });
    });

    //----------------------------------------------// GamePage
    // 방 입장
    // 같은 방 입장한 회원 구분 roomID - socket.id
    socket.on('join room', (roomID) => {
      console.log('roomID: ', roomID);
      let rooms = io.sockets.adapter.rooms;
      let room = rooms.get(roomID);

      console.log('roomSize: ', room?.size);

      if (room?.size > 7) {
        socket.emit('room full');
        return;
      } else {
        room?.size !== undefined
          ? roomToUser[roomID].push(socket.id)
          : ((roomToUser[roomID] = [socket.id]), (checkReady[roomID] = 0));
        socket.join(roomID);
        userToRoom[socket.id] = roomID;
        // console.log('usersInfo: ', roomToUser[roomID]);

        const usersInThisRoom = roomToUser[roomID].filter(
          (id) => id !== socket.id
        );
        console.log('usersInThisRoom', usersInThisRoom);
        socket.emit('all users', usersInThisRoom);

        io.to(roomID).emit('notice', {
          msg: `${socket.id}님이 입장했습니다.`,
          roomToUser: roomToUser[roomID],
        });
        // User 입장 시 개인 welcome msg
        socket.emit('getDM', {
          from_id: 'admin',
          to_id: socket.id,
          msg: `Hello, ${socket.id}`,
        });
      }

      console.log('rooms :', rooms);
      console.log('room :', room);
      console.log('userToRoom:', userToRoom);
      console.log('roomToUser:', roomToUser);
    });

    socket.on('sending signal', (payload) => {
      console.log('----------------sending signal');
      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on('returning signal', (payload) => {
      console.log('----------------returning signal');

      io.to(payload.callerID).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id,
      });
    });

    // 방 나가기 클릭시,
    socket.on('exitRoom', async (data) => {
      let roomID = userToRoom[data.from_id];
      // let userlistinRoom = await io.in(roomID).fetchSockets();
      // console.log('userlistinRoom:', userlistinRoom);
      io.to(roomID).emit('notice', {
        msg: `${socket.id}님이 방을 나갔습니다.`,
        roomToUser: roomToUser[roomID],
      });
      roomToUser[roomID]?.length > 1
        ? (roomToUser[roomID] = roomToUser[roomID].filter(
            (e) => e !== data.from_id
          ))
        : delete roomToUser[data.from_id];
      socket.leave(roomID);
      delete userToRoom[data.from_id];
    });

    // User의 chat 수신 - 전체 전송
    socket.on('sendChat', (data) => {
      io.to(userToRoom[data.from_id]).emit('getChat', {
        from_id: data.from_id,
        msg: data.msg,
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

    // 게임 시작 전,
    // 방장 빼고 전원 ready 누르면 방장 gamestart 버튼 disabled=false
    // gamestart 버튼 클릭
    // 게임 시작 : setIsGame(true)
    socket.on('gameReady', (data) => {
      let roomID = userToRoom[data.from_id];
      let readyCnt = roomToUser[roomID]?.length - 1; // 방장 빼고 전부 ready
      checkReady[roomID] === readyCnt - 1
        ? io.to(roomToUser[roomID][0]).emit('readyComplete')
        : checkReady[roomID] > 0
        ? (checkReady[roomID] += 1)
        : ((checkReady[roomID] = 1),
          io.to(roomID).emit('gameNotice', {
            dayNight: false,
            msg: 'Player들이 Ready 중 입니다.',
            killed: false,
          }));
      console.log('readyOrNot: ', checkReady[roomID], readyCnt);
    });

    const setTimer = (id, index) => {
      roomTimer[id] = { ...timerList[index] };
    };

    const startTimer = (id) => {
      console.log(`타이머 시작. 방 번호 ${id}`);
      let targetIndex = 0;
      let isNoticeSended = false;

      const interval = setInterval(() => {
        if (!roomTimer[id]) {
          isNoticeSended = false;
          setTimer(id, 0);
        }

        if (roomTimer[id]?.ms <= 0) {
          isNoticeSended = false;
          targetIndex += 1;
          if (targetIndex > timerList.length - 1) {
            targetIndex = 0;
          }
          setTimer(id, targetIndex);
        }

        if (!isNoticeSended) {
          console.log(id, roomTimer, targetIndex);
          io.to(id).emit('gameNotice', {
            dayNight: roomTimer[id].type,
            msg: roomTimer[id].noticeMessage,
          });
          isNoticeSended = true;
        }
        roomTimer[id].ms -= 1000;
        io.to(id).emit('timerChange', roomTimer[id]);
      }, 1000);
    };

    // ------------------------------------------------------[1] 게임 시작
    // 방장이 gameStart 누름
    socket.on('gameStart', (data) => {
      let roomID = userToRoom[data.from_id];
      jobList[roomID] = getJobList();
      io.to(roomID).emit('gameStart', {
        jobList: jobList[roomID],
      });
      // io.to(roomID).emit('gameNotice', {
      //   dayNight: 'night',
      //   msg: '밤이 되었습니다',
      //   killed: false,
      // });

      startTimer(roomID);
      delete checkReady[roomID];
    });

    // ------------------------------------------------------[2] 밤
    // 밤 - mafia가 고름
    // mafia 한명 - 고른 사람 죽음
    // mafia 두명 - 마지막으로 고른 사람 죽음
    let mafiaVotedList = {};
    socket.on('mafiaVoted', (data) => {
      let roomID = userToRoom[data.from_id];
      console.log(data);
      if (roomToUser[roomID]?.length <= 5) {
        io.to(roomID).emit('gameNotice', {
          dayNight: 'day',
          msg: '낮이 되었습니다',
          killed: data.killed_id,
        });
      } else {
        mafiaVotedList[roomID]
          ? mafiaVotedList[roomID].push(data.killed_id)
          : (mafiaVotedList[roomID] = [data.killed_id]);

        if (mafiaVotedList.length > 1) {
          mafiaVotedList[0] === mafiaVotedList[1]
            ? io.to(roomID).emit('gameNotice', {
                dayNight: 'day',
                msg: '낮이 되었습니다',
                killed: data.killed_id,
              })
            : io.to(roomID).emit('gameNotice', {
                dayNight: 'day',
                msg: '낮이 되었습니다',
                killed: false,
              });
        }
      }
    });

    // ------------------------------------------------------[3] 낮
    // 낮 - 죽일 사람 투표
    let peopleVotedList = {};
    socket.on('peopleVoted', (data) => {
      let roomID = userToRoom[data.from_id];
      let length = roomToUser[roomID]?.length;
      let killedid = data.killed_id;

      peopleVotedList[roomID] ||= {};

      peopleVotedList[roomID][killedid]
        ? peopleVotedList[roomID][killedid].push(data.from_id)
        : (peopleVotedList[roomID] = { killedid: [data.from_id] });
      console.log('peopleVotedList: ', peopleVotedList[roomID]);
    });

    // 낮 - 시간 종료시,
    socket.on('timeOut', (data) => {
      let roomID = userToRoom[data.from_id];
      io.to(roomID).emit('votedResult', {
        peopleVotedList: peopleVotedList[roomID],
      });
    });

    // 낮 - 최종 투표 결과
    // finalVoteCnt>0 killed : finalist
    // 다시 밤으로
    let finalVoteCnt = {};
    let finalVotedList = {};
    socket.on('finalVote', (data) => {
      let roomID = userToRoom[data.from_id];
      let len = roomToUser[roomID]?.length;
      finalVotedList[roomID] ||= [];

      finalVoteCnt[roomID] ||= 0;
      data.voted ? (finalVoteCnt[roomID] += 1) : (finalVoteCnt[roomID] -= 1);

      if (finalVotedList[roomID].push(data.from_id) === len) {
        finalVoteCnt[roomID] > 0
          ? io.to(roomID).emit('gameNotice', {
              dayNight: 'night',
              msg: '밤이 되었습니다',
              killed: data.to_id,
            })
          : io.to(roomID).emit('gameNotice', {
              dayNight: 'night',
              msg: '밤이 되었습니다',
              killed: false,
            });
      }
    });

    // ------------------------------------------------------[4] 게임 종료
    // 게임 종료
    socket.on('gameEnd', (data) => {
      let roomID = userToRoom[data.from_id];
      delete checkReady[roomID];
      delete mafiaVotedList[roomID];
      delete peopleVotedList[roomID];
      delete finalVotedList[roomID];
      delete finalVoteCnt[roomID];
    });

    socket.on('disconnect', () => {
      let roomID = userToRoom[socket.id];
      let email = socketToEmail[socket.id];
      delete emailToSocket[email];
      delete socketToEmail[socket.id];
      console.log('emailToSocket[email]: ', emailToSocket[email]);
      console.log('socketToEmail: ', socketToEmail);
      checkReady[roomID] -= 1;

      io.to(roomID).emit('notice', {
        msg: `${socket.id}님이 방을 나갔습니다.`,
        roomToUser: roomToUser[roomID],
      });
      roomToUser[roomID]?.length > 1
        ? (roomToUser[roomID] = roomToUser[roomID].filter(
            (e) => e !== socket.id
          ))
        : delete roomToUser[socket.id];
      console.log('User Disconnected :' + socket.id);
      // console.log('check:', userToRoom[socket.id]?.slice(0, -2));
      socket.leave(roomID);
      delete userToRoom[socket.id];
    });
  });
};
