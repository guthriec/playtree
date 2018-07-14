import React, { Component } from 'react';

import MdChevronLeft from 'react-icons/lib/md/chevron-left';

export default class SidebarCollapserView extends Component { 
  render() {
    return (
      <div
        className="sidebar-collapser"
        onClick={() => this.props.collapse()}>
        <div className="hide-menu-button">
          <MdChevronLeft size={30} />
          <p>Hide menu</p>
        </div>
      </div>
    );
  }
}
