import React, { Component } from 'react';

import SidebarCollapserView from './sidebarCollapserView';
import SidebarHeaderView from './sidebarHeaderView';
import SidebarFooterView from './sidebarFooterView';
import HomeButtonView from './homeButtonView';
import ChannelNavView from './channelNavView';

import './sidebar.css';

export default class SidebarView extends Component {
  render() {
    return (
      <div className="sidenav">
        <SidebarCollapserView
          collapse={this.props.toggleSidebar}
        />
        <SidebarHeaderView
          collapse={this.props.toggleSidebar}
        />
        <div className="full-section-divider"></div>
        <HomeButtonView />
        <ChannelNavView
          channels={this.props.channels}
        />
        <SidebarFooterView />
      </div>
    );
  }
}
