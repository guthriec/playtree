import { combineReducers } from 'redux';
import user from './user';
import feeds from './feeds';
import videos from './videos';
import channels from './channels';

const rootReducer = combineReducers({
  user,
  feeds,
  videos,
  channels
});

export default rootReducer;
