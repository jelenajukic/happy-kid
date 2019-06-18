import React, { Component } from 'react'
import './LogIn.css'
import Form from "./Form";
import { Link } from "react-router-dom";
// import '../../auth/AuthService'
import AuthService from '../../auth/AuthService';;

export default class LogIn extends Component {

  service = new AuthService();

  updateState = (userData) => {
    this.props.updateStateInAuth(userData)
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="LogIn">
        <div className="LogInImgDiv"></div>
        <div className="LogInFormDiv">
          <h1>Welcome Back!</h1>
          <div className="LogInSignUpLinks">
            <Link to="/"><span>LogIn</span></Link>
            <Link to="/signup"><span>SignUp</span></Link>
          </div>
          <Form buttonText="LogIn" updateState={this.updateState} formAction={this.service.login} />
        </div>
      </div >
    )
  }
}
