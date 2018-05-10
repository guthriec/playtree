import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clearActiveVideo, requestVideoLoad } from '../actions';

import Sidebar from './sidebar';
import Feed from './feed';
import Play from './play';

class App extends Component {
  constructor(props) {
    super(props);
    var vidId = props.match.params.video;
    if (vidId) {
      props.requestVideoLoad(vidId);
    } else {
      props.clearActiveVideo();
    }
  }

  componentWillReceiveProps(nextProps) {
    var nextVidId = nextProps.match.params.video;
    if (nextVidId) {
      nextProps.requestVideoLoad(nextVidId);
    } else {
      nextProps.clearActiveVideo();
    }
  }

  render() {
    var currVidId = this.props.match.params.video;
    if (currVidId) {
      return (
        <Play />
      );
    } else {
      return (
        <div>
          <Sidebar />
          <Feed />
        </div>
      );
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {}
};

const mapDispatchToProps = function(dispatch) {
  return {
    clearActiveVideo: () => {dispatch(clearActiveVideo())},
    requestVideoLoad: (videoId) => {
      dispatch(requestVideoLoad(videoId))
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(App);
