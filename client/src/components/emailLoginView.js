import React, { Component } from 'react';

import './emailLogin.css';

export default class EmailLoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      passwordValue: '',
      showPassword: false
    };
  }

  handleChange(event, inputName) {
    if (inputName === "email") {
      this.setState({
        emailValue: event.target.value
      })
    } else if (inputName === "password") {
      this.setState({
        passwordValue: event.target.value
      })  
    }
  }

  togglePassword(event) {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="email-login">
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Email</p>
            <input type="text" name="email" value={this.state.emailValue}
              onChange = {(event) => this.handleChange(event, "email")}/>
          </label>
          <label>
            <p>Password</p>
            <input type={this.state.showPassword ? "text" : "password"} name="password" value={this.state.passwordValue}
              onChange = {(event) => this.handleChange(event, "password")}/>
          </label>
          <div className="horizontal">
            <label className="show-password">
              <input type="checkbox" checked={this.state.showPassword}
                onClick={this.togglePassword.bind(this)}/>
              <p>Show password</p>
            </label> 
            <input type="submit" value="Log In" onClick={() => {
              this.props.loginByEmail(this.state.emailValue, this.state.passwordValue);
            }}/>
          </div>
        </form>
      </div>
    );
  }
}