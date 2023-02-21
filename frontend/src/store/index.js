import { combineReducers } from 'redux';
import room from './modules/room';
import MessageReducer from './modules/message';
import StatusReducer from './modules/status';

export default combineReducers({
  room,
  message: MessageReducer,
  status: StatusReducer,
});
