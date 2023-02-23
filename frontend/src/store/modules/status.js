const SET_GAME_STATUS = 'SET_GAME_STATUS';
const SET_TIME_STATUS = 'SET_TIME_STATUS';
const SET_MY_STATUS = 'SET_MY_STATUS';

const initalState = {
  /** wait(게임 시작전), playing(게임 중), end (게임 종료) */
  gameStatus: 'wait',
  /** dayDiscussion(낮 토론 시간),dayVote(낮 투표 시간),dayFinal,   night(밤) */
  timeStatus: 'day',
  /** alive(살아있음), dead(죽음) */
  myStatus: 'alive',
};

/** @param {"wait" | "playing" | "end"} newGameStatus */
export const setGameStatus = (newGameStatus) => ({
  type: SET_GAME_STATUS,
  payload: { gameStatus: newGameStatus },
});

/** @param {"day" | "night"} newGameStatus */
export const setTimeStatus = (newTimeStatus) => ({
  type: SET_TIME_STATUS,
  payload: { timeStatus: newTimeStatus },
});

/** @param {"alive" | "dead"} newMyStatus */
export const setMyStatus = (newMyStatus) => ({
  type: SET_MY_STATUS,
  payload: { myStatus: newMyStatus },
});

const StatusReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_GAME_STATUS:
      return { ...state, gameStatus: action.payload.gameStatus };
    case SET_TIME_STATUS:
      return { ...state, timeStatus: action.payload.timeStatus };
    case SET_MY_STATUS:
      return { ...state, myStatus: action.payload.myStatus };
    default:
      return state;
  }
};

export default StatusReducer;
