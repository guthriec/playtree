import {
  RECEIVE_FEED,
  REQUEST_FEED,
  HIDE_VIDEO,
  SHOW_VIDEO
} from '../actions';

function singleFeedContent(
  state = {
    isFetching: false,
    adjective: "",
    name: "",
    location: "",
    videos: {},
  },
  action
) {
  switch (action.type) {
    case REQUEST_FEED:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_FEED:
      return Object.assign({}, state, {
        isFetching: false,
        videos: action.videos,
        name: action.name,
        adjective: action.adjective,
        location: action.location
      });
    case HIDE_VIDEO:
      var newVideos = state.videos;
      newVideos[action.videoId].isHidden = true;
      return Object.assign({}, state, {
        videos: newVideos
      });
    case SHOW_VIDEO:
      newVideos = state.videos;
      newVideos[action.videoId].isHidden = false;
      return Object.assign({}, state, {
        videos: newVideos
      });
    default:
      return state;
  }
}

export default function feeds(
  state = {}, action) {
  switch(action.type) {
    case RECEIVE_FEED:
    case REQUEST_FEED:
    case HIDE_VIDEO:
    case SHOW_VIDEO:
      var nextState = {};
      if (action.feedKey in state) {
        nextState[action.feedKey] =
          singleFeedContent(state[action.feedKey], action);
      } else {
        nextState[action.feedKey] =
          singleFeedContent(undefined, action);
      }
      return Object.assign({}, state, nextState);
    default:
      return state;
  }
}
