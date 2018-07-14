import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import './AppView.css';
import logo from '../white-tree-nobg.png';

export default class SidebarHeaderView extends Component { 
  render() {
    return (
      <div className="side-header">
        <NavLink
          to='/'
          isActive={() => {return false}}>
            <div className="title">
              <p className="main-title">playtree.tv</p>
            </div>
        </NavLink>
        
        <img
          className="logo"
          src={logo}
          alt="Logo"
          onClick = {() => this.props.collapse()}
        />

      </div>
    );
  }
}
