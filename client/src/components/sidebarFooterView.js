import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './AppView.css';

export default class SidebarFooterView extends Component { 
  render() {
    var contents = "";
    if (process.env.REACT_APP_USERS_ENABLED === "true") {
      contents = this.props.isLoggedIn ? (
        <div>
          <div className="right-button">
            <NavLink
              to={'/account'}
              activeClassName="active">
              Account
            </NavLink>
          </div>
          <div className="right-button">
            <NavLink
              to={'/new-upload'}
              activeClassName="active">
              Upload a Video
            </NavLink>
          </div>
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
    } else {
      contents = (
        <div className="right-button">
          <NavLink
            to={'/submit'}
            activeClassName="active">
            Submit a Video
          </NavLink>
        </div>
      );
    }
    return (
      <div className="side-footer">
        {contents}
      </div>
    );
  }
}
