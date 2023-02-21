const initState = {
  roomID: '',
  userList: ['', '', '', '', '', '', '', ''],
  jobList: [],
  myJob: '',
  mySocketId: '',
  finalistId: '',
};

// ACTION TYPE
const GETROOMID = 'room/GETROOMID';

const GETUSERLIST = 'room/GETUSERLIST';

const SET_JOB_LIST = 'SET_JOB_LIST';

const SET_SOCKET_ID = 'SET_SOCKET_ID';

const SET_FINALIST_ID = 'SET_FINALIST_ID';

// 액션 생성 함수
export const getRoomID = (roomID) => ({ type: GETROOMID, payload: roomID });

export const getUserList = (userList) => ({
  type: GETUSERLIST,
  payload: { userList },
});

export const setJobList = (jobList, myJob) => ({
  type: SET_JOB_LIST,
  payload: { jobList, myJob },
});

export const setSocketId = (mySocketId) => ({
  type: SET_SOCKET_ID,
  payload: { mySocketId },
});

export const setFinalListId = (id) => ({
  type: SET_FINALIST_ID,
  payload: { id },
});

// REDUCER
export default function room(state = initState, action) {
  switch (action.type) {
    case SET_SOCKET_ID:
      return { ...state, mySocketId: action.payload.mySocketId };
    case GETROOMID:
      return { ...state, roomID: action.payload.roomID };
    case GETUSERLIST: {
      const newUserList = [...action.payload.userList];
      for (let i = 0; i < 8; i += 1) {
        if (!newUserList[i]) newUserList.push('');
      }
      return { ...state, userList: newUserList };
    }
    case SET_JOB_LIST:
      return {
        ...state,
        jobList: action.payload.jobList,
        myJob: action.payload.myJob,
      };
    case SET_FINALIST_ID:
      return { ...state, finalistId: action.payload.id };
    default:
      return state;
  }
}
