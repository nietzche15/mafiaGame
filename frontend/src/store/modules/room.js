const initState = {
  roomID: '',
  userList: ['', '', '', '', '', '', '', ''],
  jobList: [],
  myJob: '',
};

// ACTION TYPE
const GETROOMID = 'room/GETROOMID';

const GETUSERLIST = 'room/GETUSERLIST';

const GETJOBLIST = 'room/GETJOBLIST';

// 액션 생성 함수
export const getRoomID = (roomID) => ({ type: GETROOMID, payload: roomID });

export const getUserList = (userList) => ({
  type: GETUSERLIST,
  payload: { userList },
});
export const getJobList = (jobList, myJob) => ({
  type: GETJOBLIST,
  payload: { jobList: jobList, myJob: myJob },
});

// REDUCER
export default function room(state = initState, action) {
  switch (action.type) {
    case GETROOMID:
      return { ...state, roomID: action.payload.roomID };
    case GETUSERLIST:
      const newUserList = [...action.payload.userList];
      for (let i = 0; i < 8; i++) {
        if (!newUserList[i]) newUserList.push('');
      }
      return { ...state, userList: newUserList };
    case GETJOBLIST:
      return {
        ...state,
        jobList: action.payload.jobList,
        myJob: action.payload.myJob,
      };
    default:
      return state;
  }
}
