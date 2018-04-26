import {
  RECEIVE_HOME_VIDEOS,
  REQUEST_HOME_VIDEOS
} from '../actions';

const initialState = {
  isFetching: false,
  videos: {}
}

function apiListToState(videoList) {
  var idObj = {};
  for (var i = 0; i < videoList.length; i++) {
    var currVid = videoList[i];
    currVid.isHidden = false;
    idObj[currVid.shortId] = currVid;
  }
  return idObj;
}

export default function homeVideos(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_HOME_VIDEOS:
      return Object.assign({}, state, {
        isFetching: false,
        videos: apiListToState(action.videos)
      });
    case REQUEST_HOME_VIDEOS:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
}
