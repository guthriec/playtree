import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import SidebarView from '../components/sidebarView';
import SidebarExpanderView from '../components/sidebarExpanderView';

import { toggleSidebar } from '../actions';

class Sidebar extends Component {
  render() {
    if (this.props.isCollapsed) {
      return (
        <SidebarExpanderView
          expand={this.props.toggleSidebar}
        />
      );
    } else {
      return (
        <SidebarView 
          channels={this.props.channels}
          toggleSidebar={this.props.toggleSidebar}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
  isCollapsed: state.sidebar.isCollapsed
});

const mapDispatchToProps = function(dispatch) {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
