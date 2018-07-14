import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { feedKeyFromParams } from '../utils';

import VideoEntry from './videoEntry';

import FeedView from '../components/feedView';

import { toggleSidebar } from '../actions';

class Feed extends Component {
  render() {
    var videoList = []
    if ("videos" in this.props.feed) {
      videoList = this.props.feed.videos;
    }
    var entryList;
    if (videoList) {
      entryList = Object.values(videoList).map(video =>
        <VideoEntry key={video._id}
                    video={video}
                    feed={this.props.feed}
                    feedKey = {this.props.feedKey} />
      );
    }
    return (
      <FeedView
        feedAdjective={this.props.feed.adjective}
        entryList={entryList}
        wideFeed={this.props.isSidebarCollapsed}
        collapseSidebar={this.props.toggleSidebar}
      />
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  var feedVal = {};
  var feedKey = feedKeyFromParams(ownProps.match.params);
  if (feedKey in state.feeds) {
    feedVal = state.feeds[feedKey];
  }
  return {
    feedKey: feedKey,
    feed: feedVal,
    isSidebarCollapsed: state.sidebar.isCollapsed
  }
};

const mapDispatchToProps = function(dispatch) {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed));
