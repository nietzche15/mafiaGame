const initState = {
  /** 방 번호 */
  roomID: '',
  /** 유저 목록 */
  userList: ['', '', '', '', '', '', '', ''],
  /** 직업 목록 mafia 마피아 */
  jobList: [],
  /** 내 직업 */
  myJob: '',
  /** 내 소켓 아이디 */
  mySocketId: '',
  /** 지목 투표 많이 당한 사람 */
  finalistId: '',
  /** 죽은 유저 목록 */
  killedUserList: [],
};

// ACTION TYPE
const GETROOMID = 'room/GETROOMID';

const GETUSERLIST = 'room/GETUSERLIST';

const SET_JOB_LIST = 'SET_JOB_LIST';

const SET_SOCKET_ID = 'SET_SOCKET_ID';

const SET_FINALIST_ID = 'SET_FINALIST_ID';

const ADD_KILLED_USER = 'ADD_KILLED_USER';

// 액션 생성 함수
/** @param {string} roomID 방 번호 */
export const getRoomID = (roomID) => ({ type: GETROOMID, payload: roomID });

/** 유저 목록 저장 함수
 * @param {string[]} userList 유저 목록 */
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

export const addKilledUser = (id) => ({
  type: ADD_KILLED_USER,
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
    case ADD_KILLED_USER:
      return {
        ...state,
        killedUserList: [...state.killedUserList, action.payload.id],
      };
    default:
      return state;
  }
}
