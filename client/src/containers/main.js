import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { feedKeyFromParams } from '../utils';

import VideoEntry from './videoEntry';
import MainHeader from '../components/mainHeader';

class Main extends Component {
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
      <div className="main">
        <MainHeader adjective = {this.props.feed.adjective}/>
        <div className="entry-list">
          { entryList }
        </div>
      </div>
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
    feed: feedVal
  }
};

const mapDispatchToProps = function(dispatch) {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
