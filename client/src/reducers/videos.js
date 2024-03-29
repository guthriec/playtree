import {
  CACHE_VIDEO_INFO,
  LOAD_VIDEO,
  CLEAR_ACTIVE_VIDEO,
  RECEIVE_IMPORTED_VIDEO,
} from '../actions';

const initialState = {
  activeVideo: {},
  videos: {},
  receivedImportedVideo: false,
  importedVideo: {}
}

export default function videos(state = initialState, action) {
  switch(action.type) {
    case CACHE_VIDEO_INFO:
      const newVideos = Object.assign({}, state.videos, action.videosById);
      return Object.assign({}, state, {
        videos: newVideos
      });
    case LOAD_VIDEO:
      return Object.assign({}, state, {
        activeVideo: action.video
      });
    case CLEAR_ACTIVE_VIDEO:
      return Object.assign({}, state, {
        activeVideo: {}
      });
    case RECEIVE_IMPORTED_VIDEO:
      return {
        ...state,
        receivedImportedVideo: true,
        importedVideo: action.video
      };
    default:
      return state;
  }
}
