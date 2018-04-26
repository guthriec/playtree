import React, { Component } from 'react';

import './AppView.css';
import logo from '../white-tree-nobg.png';

export default class SidebarHeaderView extends Component {
  render() {
    return (
      <div className="side-header">
        <img className="logo" src={logo} alt="Logo" />
        <div className="title">
          <p className="main-title">Playtree</p>
        </div>
      </div>
    );
  }
}
