import React, { Component } from 'react'
import './Auth.css'
import Form from "./Form";
import { Link } from "react-router-dom";
import AuthService from '../../auth/AuthService';;

export default class LogIn extends Component {

  service = new AuthService();

  updateState = (userData) => {
    this.props.updateStateInAuth(userData)
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="AuthFormDiv">
        <h1>Welcome Back!</h1>
        <div className="AuthLinks">
          <Link style={{ textDecoration: 'none' }} to="/"><span>LogIn</span></Link>
          <Link style={{ textDecoration: 'none' }} to="/signup"><span>SignUp</span></Link>
        </div>
        <Form buttonText="LogIn" updateState={this.updateState} formAction={this.service.login} />
      </div>
    )
  }
}
