import React, { Component } from 'react';

import './AppView.css';

import { withRouter } from 'react-router-dom';

import SidebarHeaderView from './sidebarHeaderView';
import HomeButtonView from './homeButtonView';
import ChannelNavView from './channelNavView';

class SidebarView extends Component {
  render() {
    return (
      <div className="sidenav">
        <SidebarHeaderView />
        <div className="full-section-divider"></div>
        <HomeButtonView />
        <ChannelNavView
          channels={this.props.channels}
          onSelect={this.props.handleChannelSelect}
        />
      </div>
    );
  }
}

export default withRouter(SidebarView);
