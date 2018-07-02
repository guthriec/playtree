import React, { Component } from 'react';

import Sidebar from './sidebar';

class SubmissionInfo extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="main">
          <div className="info">
            <h3>Email <a href="mailto:submissions@playtree.tv">submissions@playtree.tv</a> for info</h3>
          </div>
        </div>
      </div>
    );  
  }
}

export default SubmissionInfo;
