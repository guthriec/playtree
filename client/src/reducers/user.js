import { LOGIN_USER } from '../actions';

const initialState = {
  user: {
    email: '',
    jwt: ''
  },
  isLoggedIn: false
}

export default function user(state=initialState, action) {
  switch(action.type) {
    case LOGIN_USER:
      return {
        user: {
          email: action.email,
          jwt: action.jwt
        },
        isLoggedIn: true
      }
    default:
      return state;
  }
}