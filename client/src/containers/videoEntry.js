import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VideoEntryView from '../components/videoEntryView';
import { hideVideo, showVideo } from '../actions';

class VideoEntry extends Component {
  constructor(props) {
    super(props);
    var shareLink = "playtree.tv";
    if ('location' in props.feed) {
      shareLink = "playtree.tv" + props.feed.location + "/video/" +
                  props.video.shortId;
    }
    this.state = {
      modal: {
        isOpen: false,
        type: ""
      },
      shareLink: shareLink,
      doesDescOverflow: false
    }
    this.testDescOverflow = this.testDescOverflow.bind(this);
    this.handleShareLinkChange = this.handleShareLinkChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  testDescOverflow(descEl) {
    if (descEl.scrollHeight > (descEl.clientHeight + 4)) {
      this.setState({doesDescOverflow: true});
    } else {
      this.setState({doesDescOverflow: false});
    }
  }

  handleShareLinkChange(event) {
    event.preventDefault();
    this.setState({shareLink: event.target.value});
  }

  openModal(type) {
    this.setState({modal: {isOpen: true, type: type}});
  }

  closeModal() {
    this.setState({modal: {isOpen: false, type: ""}});
  }

  render() {
    var linkDestination = "";
    if ('location' in this.props.feed) {
      linkDestination = this.props.feed.location + "/video/" +
                        this.props.video.shortId;
    }
    var feedVids = this.props.feed.videos;
    var videoIsHidden = false;
    if (this.props.video.shortId in feedVids) {
      videoIsHidden = feedVids[this.props.video.shortId].isHidden;
    }
    return (
      <VideoEntryView
        video={this.props.video}
        videoIsHidden={videoIsHidden}
        linkDestination={linkDestination}
        shareLink={this.state.shareLink}
        handleShareLinkChange={this.handleShareLinkChange}
        modalState={this.state.modal}
        openModal={this.openModal}
        closeModal={this.closeModal}
        hideVideo={this.props.hideVideo}
        showVideo={this.props.showVideo}
        doesDescOverflow={this.state.doesDescOverflow}
        testDescOverflow={this.testDescOverflow}
        feed={this.props.feed}
        feedKey={this.props.feedKey}
      />
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = function(dispatch) {
  return {
    hideVideo: (videoId, feedKey) => {
      dispatch(hideVideo(videoId, feedKey));
    },
    showVideo: (videoId, feedKey) => {
      dispatch(showVideo(videoId, feedKey));
    }
  }
}

const ConnectedVideoEntry =
  connect(mapStateToProps, mapDispatchToProps)(VideoEntry);

export default withRouter(ConnectedVideoEntry);
