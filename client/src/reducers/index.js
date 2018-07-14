import { combineReducers } from 'redux';
import user from './user';
import feeds from './feeds';
import videos from './videos';
import channels from './channels';
import sidebar from './sidebar';


const rootReducer = combineReducers({
  user,
  feeds,
  videos,
  channels,
  sidebar
});

export default rootReducer;
