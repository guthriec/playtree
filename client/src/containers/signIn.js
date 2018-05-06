import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sidebar from './sidebar';
import EmailLoginView from '../components/emailLoginView';

import { loginByEmail } from '../actions/authActions';

class SignIn extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="main">
          <EmailLoginView loginByEmail={this.props.loginByEmail}/>
        </div>
      </div>
    );  
  }
}

const mapStateToProps = function (state, ownProps) {
  return {}
};

const mapDispatchToProps = function(dispatch) {
  return {
    loginByEmail: (email, password) => {
      dispatch(loginByEmail(email, password))
    }
  }
}

SignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default withRouter(SignIn);