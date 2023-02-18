const initState = {
    roomID: '',
  };
  
  // ACTION TYPE
  const GETROOMID = 'room/GETROOMID';
  const GETUSERLIST = 'room/GETUSERLIST';
  
  // 액션 생성 함수
  export const getRoomID = (roomID) => ({ type: GETROOMID, payload: roomID });
  
  // REDUCER
  
  export default function room(state = initState, action) {
    switch (action.type) {
      case GETROOMID:
        return { ...state, roomID: action.payload.roomID };
      default:
        return state;
    }
  }
  