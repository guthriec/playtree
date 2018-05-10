import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sidebar from './sidebar';
import UploaderView from '../components/uploaderView';

class Uploader extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="main">
          <UploaderView />
        </div>
      </div>
    );  
  }
}

const mapStateToProps = function (state, ownProps) {
  return {}
};

const mapDispatchToProps = function(dispatch) {
  return {}
}

Uploader = connect(mapStateToProps, mapDispatchToProps)(Uploader);
export default withRouter(Uploader);
