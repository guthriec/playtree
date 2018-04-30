import {
  RECEIVE_CHANNEL,
  REQUEST_CHANNEL
} from '../actions';


function singleChannelInfo(
  state = {
    isFetching: false,
    urlSegment: "",
    adjective: "",
    topic: ""
  },
  action
) {
  switch (action.type) {
    case REQUEST_CHANNEL:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, {
        isFetching: false,
        urlSegment: action.info.urlSegment,
        adjective: action.info.adjective,
        topic: action.info.topic
      });
    default:
      return state
  }
}

export default function channels(
  state = {}, action) {
  switch(action.type) {
    case RECEIVE_CHANNEL:
    case REQUEST_CHANNEL:
      var nextState = {};
      if (action.channel in state) {
        nextState[action.channel] =
          singleChannelInfo(state[action.channel], action);
      } else {
        nextState[action.channel] =
          singleChannelInfo(undefined, action);
      }
      return Object.assign({}, state, nextState);
    default:
      return state;
  }
}
