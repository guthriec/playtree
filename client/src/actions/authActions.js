export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const RECEIVE_REGISTER = 'RECEIVE_REGISTER';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_USER = "LOGIN_USER";
export const BAD_CREDENTIALS = 'BAD_CREDENTIALS';

export const LOAD_USER = 'LOAD_USER';

function loginUser(email, jwt) {
  return {
    type: LOGIN_USER,
    email: email,
    jwt: jwt
  }
}

export function loadUser() {
  return function(dispatch) {
    var jwt = localStorage.getItem('jwt');
    var email = localStorage.getItem('jwt');
    if (jwt && email) {
      dispatch(loginUser(email, jwt));  
    }  
  }
}

function badCredentials(err) {
  return {
    type: BAD_CREDENTIALS,
    err: err
  }
}

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

function receiveLogin(email, jwt) {
  return function(dispatch) {
    localStorage.setItem('email', email);
    localStorage.setItem('jwt', jwt);
    dispatch(loginUser(email, jwt));
  } 
}

export function loginByEmail(email, password) {
  return function(dispatch) {
    dispatch(requestLogin());
    return fetch('/api/login/',
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password
              })
            }
      )
      .then(
        response => {
          if (response.status !== 200) {
            dispatch(badCredentials(response.statusText));
            return Promise.reject("Bad Credentials");
          } else {
            return response.json();
          }
        }
      )
      .then(
        json => {
          dispatch(receiveLogin(email, json.token));
        }
      )
      .catch((err) => console.log(err))
  }
}