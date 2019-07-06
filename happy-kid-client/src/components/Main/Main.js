import React, { Component } from 'react'
import UserService from '../../user/UserService';
import AuthService from '../../auth/AuthService';
import NavBar from "./NavBar";
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import MenuCard from './MenuCard'
import "./Main.css"
import TimeLineMessageUser from './TimeLineMessageUser';
import Calendar from './Calendar'
import ChatApp from './ChatApp'
import FindUs from './FindUs'

export default class Main extends Component {
  state = {
    timeLineMessages: [],
    kids: [],
  }

  authService = new AuthService();
  userService = new UserService();

  logOut = () => {
    this.authService.logout()
      .then(response => {
        console.log("LogOut returns:", response);
        this.props.updateStateInGS(null, false);
      })
  }

  componentDidMount() {
    this.userService.messages(this.props.state.user._id)
      .then((result) => {
        this.setState({
          timeLineMessages: result
        })
      })
      .then(() => this.userService.parentKids(this.props.state.user._id)
        .then((result) => {
          this.setState({
            kids: result.kidsID
          })
        }))
  }

  render() {
    return (
      <div className="Main">
        <NavBar state={this.props.state} logOut={this.logOut} />
        <Header />
        <div className="content">
          <div className="menuCards">
            <MenuCard classList="fa fa-bell fa-3x" linkText="/" spanValue="time line" />
            <MenuCard classList="fa fa-info fa-3x" linkText="/informus" spanValue="inform us" />
            <MenuCard classList="fa fa-street-view fa-3x" linkText="/findus" spanValue="find us" />
            <MenuCard classList="fab fa-rocketchat fa-3x" linkText="/chat" spanValue="bla-bla with us" />
          </div>
          <div className="centralWindow">
            <Switch>
              <Route path='/informus' render={(props) => <Calendar {...props} kids={this.state.kids} />} />
              <Route path='/chat' render={(props) => <ChatApp {...props} user={this.props.state.user.username} />} />
              <Route path='/findus' render={(props) => <FindUs {...props} user={this.props.state.user.username} />} />
              <Route
                path="/"
                render={this.state.timeLineMessages.length !== 0 ? (props) => <TimeLineMessageUser {...props} timeLineMessages={this.state.timeLineMessages} /> : null} />
            </Switch>
          </div>
        </div>
        <footer>Hello footer</footer>
      </div>
    )
  }
}