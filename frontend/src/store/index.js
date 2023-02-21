import { combineReducers } from 'redux';
import room from './modules/room';
import MessageReducer from './modules/message';

export default combineReducers({
  room,
  message: MessageReducer,
});
