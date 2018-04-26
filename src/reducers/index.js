import { combineReducers } from 'redux';
import feeds from './feeds';
import videos from './videos';
import channels from './channels';

const rootReducer = combineReducers({
  feeds,
  videos,
  channels
});

export default rootReducer;
