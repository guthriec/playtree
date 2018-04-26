import React, { Component } from 'react';

import './mainHeader.css';

export default class MainHeader extends Component {
  render() {
    return (
      <div className="main-header">
        <p>
          your source for
          <b className="header-bold"> {this.props.adjective} </b>
          videos
        </p>
      </div>
    );
  }
}
