import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import SidebarHeaderView from '../components/sidebarHeaderView';
import SidebarFooter from './sidebarFooter';
import HomeButtonView from '../components/homeButtonView';
import ChannelNavView from '../components/channelNavView';


class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidenav">
        <SidebarHeaderView />
        <div className="full-section-divider"></div>
        <HomeButtonView />
        <ChannelNavView
          channels={this.props.channels}
        />
        <SidebarFooter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels
});

export default withRouter(connect(mapStateToProps)(Sidebar));