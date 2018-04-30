import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './AppView.css';

class ChannelNavView extends Component {
  render() {
    var channelList = Object.values(this.props.channels);
    return (
      <div className="topic-tabs">
        <div className="topic-section-label">
          <p>Channels</p>
        </div>
        {channelList.map(function(channel, ind) {
          return (
            <div key={ind} className="right-button">
              <NavLink
                to={'/channel/' + channel.urlSegment}
                activeClassName="active">
                {channel.topic}
              </NavLink>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(ChannelNavView);
