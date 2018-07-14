import React, { Component } from 'react';

import './sidebar.css';
import logo from '../white-tree-nobg.png';

import MdChevronRight from 'react-icons/lib/md/chevron-right';

export default class SidebarExpanderView extends Component { 
  render() {
    return (
      <div
        className="sidebar-expander"
        onClick={() => {this.props.expand()}}
      >
        <img className="logo" src={logo} alt="Logo" />
        <div className="show-menu-button">
          <MdChevronRight size={30} />
          <p>Show<br />menu</p>
        </div>
      </div>
    );
  }
}
