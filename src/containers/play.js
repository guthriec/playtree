import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { feedKeyFromParams } from '../utils';

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
  var feedKey = feedKeyFromParams(ownProps.match.params);
  if (feedKey in state.feeds) {
    feedVal = state.feeds[feedKey];
  }
  var feedName = ""
  var feedLocation = ""
  if ("name" in feedVal) {
    feedName = feedVal.name
  }
  if ("location" in feedVal) {
    feedLocation = feedVal.location
  }
  return {
    video: state.videos.activeVideo,
    feedName: feedName,
    feedLocation: feedLocation
  }
};

const mapDispatchToProps = function(dispatch) {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Play));
