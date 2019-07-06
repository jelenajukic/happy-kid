import React, { Component } from 'react'
// import { default as Chatkit } from '@pusher/chatkit-server';
// import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

export default class Form extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    error: false,
  }

  handleChangeEvent = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: false,
    })
  }

  handleSubmitEvent = (e) => {
    e.preventDefault();
    this.props.formAction(this.state.username, this.state.password, this.state.email)
      .then(response => {
        this.props.updateState(response);
        if (this.props.buttonText === "SignUp") {
          window.history.replaceState(null, null, "/"); //it will clean history
          window.location.reload(); //reload page on "http:servername/"  location
        }
      }
      )
      .catch(error => {
        this.setState({
          username: "",
          password: "",
          email: "",
          error: true,
        }, () => { console.log(this.state) })
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitEvent} method="POST">
        <div className='input-fields'>
          <input
            type='text'
            name="username"
            placeholder='Username'
            value={this.state.username}
            className='input-line full-width'
            onChange={this.handleChangeEvent}
            required
          />
          {this.props.buttonText !== "LogIn" ? <input
            type='email'
            name="email"
            placeholder='Email'
            value={this.state.email}
            className='input-line full-width'
            onChange={this.handleChangeEvent}
          /> : null}
          <input
            type='password'
            name="password"
            value={this.state.password}
            placeholder='Password'
            className='input-line full-width'
            onChange={this.handleChangeEvent}
            required
          />
          <div className='spacing'>or continue with <span className='highlight'>Facebook</span></div>
          <div><button className='ghost-round full-width'>{this.props.buttonText}</button></div>
          <p>{this.state.error ? this.props.buttonText === "LogIn" ? "Check your password and username" : "User already exists" : null}</p>
        </div>
      </form>
    )
  }
}
