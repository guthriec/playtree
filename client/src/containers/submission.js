import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { importVimeoVideo } from '../actions';

import SubmissionView from '../components/submissionView';

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        isOpen: false,
        type: ""
      },
      doesDescOverflow: false
    }
    this.testDescOverflow = this.testDescOverflow.bind(this);
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

  openModal(type) {
    this.setState({modal: {isOpen: true, type: type}});
  }

  closeModal() {
    this.setState({modal: {isOpen: false, type: ""}});
  }

  render() {
    return (
      <SubmissionView
        isWide={this.props.isSidebarCollapsed}
        importVimeoVideo={this.props.importVimeoVideo}
        video={this.props.importedVideo}
        videoReceived={this.props.videoReceived}
        modalState={this.state.modal}
        openModal={this.openModal}
        closeModal={this.closeModal}
        doesDescOverflow={this.state.doesDescOverflow}
        testDescOverflow={this.testDescOverflow}
      />
    );
  }
}

const mapStateToProps = function (state) {
  return {
    isSidebarCollapsed: state.sidebar.isCollapsed,
    importedVideo: state.videos.importedVideo,
    videoReceived: state.videos.receivedImportedVideo,
  }
};

const mapDispatchToProps = function(dispatch) {
  return {
    importVimeoVideo: (vimeoUrl) => {
      dispatch(importVimeoVideo(vimeoUrl));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Submission));
