import React, { Component } from 'react';

export default class ChannelPickerView extends Component {
  constructor(props) {
    super(props);
    this.channelList = Object.values(this.props.channelList).map(channel => {
      return {
          urlSegment: channel.urlSegment,
          topic: channel.topic
      }
    });
    
    this.state = {
      selectedChannel: this.channelList[0].urlSegment
    };

    this.handleChannelChange = this.handleChannelChange.bind(this);
    this.handleChannelSubmit = this.handleChannelSubmit.bind(this);
  }

  handleChannelChange(event) {
    console.log(event.target.value);
    this.setState({selectedChannel: event.target.value});
  }

  handleChannelSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
    console.log(this.state.selectedChannel);
    this.props.suggestChannel(this.props.channelList[this.state.selectedChannel], this.props.videoId);
  }


  render() {
    var channelOptions = Object.values(this.props.channelList).map(channel =>
      <option value={channel.urlSegment}>
        {channel.topic}
      </option>
    );

    return (
      <form onSubmit={this.handleChannelSubmit} className="channel-form">
      <label>
        Select a channel:
        <select
          name="channel"
          onChange={this.handleChannelChange}
          value={this.state.selectedChannel}
        >
          {channelOptions}
        </select>  
      </label>
      <input type="submit" value="Add to Channel" />
    </form>

    );
  }
}
