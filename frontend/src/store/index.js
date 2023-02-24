import { combineReducers } from 'redux';
import room from './modules/room';
import MessageReducer from './modules/message';
import StatusReducer from './modules/status';
import StreamReducer from './modules/stream';
import { asyncThunkSlice } from './modules/roomlist';
import userInfo from './modules/userInfo';

export default combineReducers({
  room,
  userInfo,
  message: MessageReducer,
  status: StatusReducer,
  asyncThunk: asyncThunkSlice.reducer,
  stream: StreamReducer,
});
