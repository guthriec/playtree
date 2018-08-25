import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { suggestChannel } from '../actions';

import ChannelPickerView from '../components/channelPickerView';

class ChannelPicker extends Component {
  render() {
    return (
      <ChannelPickerView
        videoId={this.props.videoId}
        channelList={this.props.channelList}
        suggestChannel={this.props.suggestChannel}
      />
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    channelList: state.channels,
  }
};

const mapDispatchToProps = function(dispatch) {
  return {
    suggestChannel: (channelUrl, videoId) => {
      dispatch(suggestChannel(videoId, channelUrl));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelPicker));
