import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { feedKeyFromParams } from '../utils';

import { setAsWatched } from '../actions';

import PlayView from '../components/playView';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerClass: "play-header"
    }
    this.onViewerActive = this.onViewerActive.bind(this);
    this.onViewerInactive = this.onViewerInactive.bind(this);
  }

  componentDidMount() {
    this.props.setAsWatched(this.props.video);
  }

  onViewerActive() {
    this.setState({headerClass: "play-header"});
  }

  onViewerInactive() {
    this.setState({headerClass: "play-header hidden"});
  }

  render() {
    return (
      <PlayView
        video={this.props.video}
        feedName={this.props.feedName}
        feedLocation={this.props.feedLocation}
        headerClass={this.state.headerClass}
        onActive={this.onViewerActive}
        onInactive={this.onViewerInactive}
      />
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  var feedVal = {};
  var video = {};
  var feedName = ""
  var feedLocation = ""

  var feedKey = feedKeyFromParams(ownProps.match.params);
  var videoId = ownProps.match.params.video;
  if (feedKey in state.feeds) {
    feedVal = state.feeds[feedKey];
    if ("name" in feedVal) {
      feedName = feedVal.name
    }
    if ("location" in feedVal) {
      feedLocation = feedVal.location
    }
    if (videoId in feedVal.videos) {
      video = feedVal.videos[videoId];
    } else {
      video = state.videos.activeVideo;
    }
  } else {
    console.log('wtf');
  }

  return {
    video: video,
    feedName: feedName,
    feedLocation: feedLocation
  }
};

const mapDispatchToProps = function(dispatch) {
  return {
    setAsWatched: (video) => {
      dispatch(setAsWatched(video));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Play));
