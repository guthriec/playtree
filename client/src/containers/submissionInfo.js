import React, { Component } from 'react';

import Sidebar from './sidebar';

class Uploader extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="main">
          <div className="info">
            <h3>Email <a href="mailto:hello@sho.global">hello@sho.global</a> for info</h3>
          </div>
        </div>
      </div>
    );  
  }
}

export default Uploader;
