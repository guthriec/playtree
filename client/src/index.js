import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import ReactModal from 'react-modal';

import './index.css';
import App from './containers/App';
import SignIn from './containers/signIn';
import Uploader from './containers/uploader';
import SubmissionInfo from './containers/submissionInfo';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import { fetchChannel, fetchHomeVideos, loadUser } from './actions';

import thunkMiddleware from 'redux-thunk';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
);

store.dispatch(loadUser());
store.dispatch(fetchHomeVideos());
store.dispatch(fetchChannel('skiing'));
store.dispatch(fetchChannel('travel'));
store.dispatch(fetchChannel('climbing'));
store.dispatch(fetchChannel('mountain-biking'));

//set react-modal app element for accessibility
ReactModal.setAppElement('#root');

ReactDOM.render(<Provider store={store}>
                  <Router>
                    <Switch>
                      <Route path="/channel/:channel/video/:video"
                             component={App} />
                      <Route path="/channel/:channel" component={App} />
                      <Route path="/video/:video" component={App} />
                      <Route path="/sign-in" component={SignIn} />
                      <Route path="/new-upload" component={Uploader} />
                      <Route path="/submit-info" component={SubmissionInfo} />
                      <Route exact path="/" component={App} />
                    </Switch>
                  </Router>
                </Provider>,
                document.getElementById('root')
);

registerServiceWorker();
