import {
  TOGGLE_SIDEBAR
} from '../actions';

const initialState = {
  isCollapsed: false
}

export default function videos(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        isCollapsed: !state.isCollapsed
      });
    default:
      return state;
  }
}
