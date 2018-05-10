import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import './AppView.css';

export default class SidebarFooterView extends Component { 
  render() {
    const contents = this.props.isLoggedIn ? (
      <div className="right-button">
        <NavLink
          to={'/new-upload'}
          activeClassName="active">
          Upload a Video
        </NavLink>
      </div>
    ) : (
      <div className="right-button">
        <NavLink
          to={'/sign-in'}
          activeClassName="active">
          Sign In to Upload Videos
        </NavLink>
      </div>
    );
    return (
      <div className="side-footer">
        {contents}
      </div>
    );
  }
}
