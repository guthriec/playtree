import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './AppView.css';

class HomeButtonView extends Component {
  render() {
    return (
      <div className="top-tabs">
        <div className="right-button">
          <NavLink
            exact
            to='/'
            activeClassName='active'>
            Home
          </NavLink>
        </div>
      </div>
    );
  }
}

export default HomeButtonView;
