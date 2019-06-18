import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'
import AuthService from '../../auth/AuthService';

export default class Auth extends Component {

  service = new AuthService();

  updateStateInAuth = (userData) => {
    let isAuthenticated = true;
    if (userData === null) {
      isAuthenticated = false
    }
    this.props.updateStateInGS(userData, isAuthenticated)
  }

  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path='/login' render={(props) => <LogIn {...props} updateStateInAuth={this.updateStateInAuth} />} /> */}
          <Route exact path='/signup' render={(props) => <SignUp {...props} />} />
          <Route exact path='/' render={(props) => <LogIn {...props} updateStateInAuth={this.updateStateInAuth} />} />
        </Switch>
      </div>
    )
  }
}
