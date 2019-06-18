import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from "../Auth/Auth.js"
import Main from "../Main/Main"
import AuthService from '../../auth/AuthService';
import AdminPage from "../Admin/AdminPage";
import AdminApp from "../Admin/AdminApp"

const Error = () => <div><h1>Error</h1></div>

export default class GlobalErrorSwitch extends Component {

  state = {
    user: null,
    isAuthenticated: false
  }

  service = new AuthService();

  updateStateInGS = (userData, isAuthenticated) => {
    this.setState({
      user: userData,
      isAuthenticated: isAuthenticated
    })
  }

  previousLocation = this.props.location
  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (nextProps.history.action !== 'POP'
      && (!location.state || !location.state.error)) {
      this.previousLocation = this.props.location
    };
  }

  componentDidMount() {
    console.log("I am in GS did mount")
    if (this.state.user === null) {
      this.service.currentUser()
        .then(response => {
          console.log("GS did mount response", response)
          this.setState({
            user: response,
            isAuthenticated: true
          })
        })
        .catch(error => this.setState({
          user: null,
          isAuthenticated: false
        }))
    }
  }

  render() {
    const { location } = this.props;
    const isError = !!(
      location.state &&
      location.state.error &&
      this.previousLocation !== location // not initial render
    )

    return (
      <div>
        {
          isError
            ? <Route component={Error} />
            : <Switch location={isError ? this.previousLocation : location}>
              {/* <Route path="/login" render={(props) => <Auth state={this.state} />} /> */}
              <Route path="/signup" render={(props) => <Auth state={this.state} />} />
              <Route path="/" render={(props) =>
                this.state.isAuthenticated ?
                  (this.state.user.username !== "admin" ? <Main {...props}
                    updateStateInGS={this.updateStateInGS}
                    state={this.state} /> : <AdminPage {...props}
                      updateStateInGS={this.updateStateInGS} state={this.state} />)
                  :
                  (<Auth {...props}
                    updateStateInGS={this.updateStateInGS}
                    state={this.state} />)} />
            </Switch>}
      </div>
    )
  }
}
