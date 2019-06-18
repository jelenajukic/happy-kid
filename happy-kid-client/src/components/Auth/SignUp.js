import React, { Component } from 'react';
import './SignUp.css';
import Form from "./Form";
import { Link } from "react-router-dom";
import AuthService from '../../auth/AuthService';

export default class SignUp extends Component {

  state = {
    user: null
  }

  updateState = (userData) => {
    this.setState({
      user: userData
    })
  }

  service = new AuthService();

  render() {
    return (
      <div className="LogIn">
        <div className="LogInImgDiv"></div>
        <div className="LogInFormDiv">
          <h1>Lets start with registration!</h1>
          <div className="LogInSignUpLinks">
            <Link to="/"><span>LogIn</span></Link>
            <Link to="/signup"><span>SignUp</span></Link>
          </div>
          <Form buttonText="SignUp" updateState={this.updateState} formAction={this.service.signup} />
        </div>
      </div >
    )
  }
}
