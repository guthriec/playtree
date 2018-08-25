import React, { Component } from 'react';

import VideoEntryPreview from './videoEntryPreview';
import Sidebar from '../containers/sidebar';

import ChannelPicker from '../containers/channelPicker';

import './submission.css';

class SubmissionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vimeoUrl: ''
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
  }

  handleUrlChange(event) {
    this.setState({vimeoUrl: event.target.value});
  }

  handleUrlSubmit(event) {
    event.preventDefault();
    this.props.importVimeoVideo(this.state.vimeoUrl);
  }

  render() {
    var videoPreview = '';
    var channelPicker = '';
    if (this.props.videoReceived) {
      videoPreview = (
        <VideoEntryPreview
          video={this.props.video}
          modalState={this.props.modalState}
          openModal={this.props.openModal}
          closeModal={this.props.closeModal}
          doesDescOverflow={this.props.doesDescOverflow}
          testDescOverflow={this.props.testDescOverflow}
        />
      );
      channelPicker = (
        <ChannelPicker videoId={this.props.video.shortId}/>
      );
    }
    return (
      <div>
        <Sidebar />
        <div className={(this.props.isWide) ? "wide-submission-panel" : "submission-panel"}>
          <div className="url-form-container">
            <form onSubmit={this.handleUrlSubmit} className="url-form">
              <label>
                Enter a Vimeo URL:  
                <input
                  type="text"
                  value={this.state.vimeoUrl}
                  onChange={this.handleUrlChange}
                  placeholder="https://vimeo.com/236787722"
                />
              </label>
              <input type="submit" value="Import video" />
            </form>
          </div>
          {videoPreview}
          {channelPicker}
        </div>
      </div>
    );  
  }
}

export default SubmissionView;
