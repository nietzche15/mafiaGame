const initState = {
  roomID: '',
  userList: [],
};

// ACTION TYPE
const GETROOMID = 'room/GETROOMID';
const GETUSERLIST = 'room/GETUSERLIST';

// 액션 생성 함수
export const getRoomID = (roomID) => ({ type: GETROOMID, payload: roomID });
export const getUserList = (userList) => ({
  type: GETUSERLIST,
  payload: { userList },
});

// REDUCER

export default function room(state = initState, action) {
  switch (action.type) {
    case GETROOMID:
      return { ...state, roomID: action.payload.roomID };
    case GETUSERLIST:
      return { ...state, userList: action.payload.userList };
    default:
      return state;
  }
}
