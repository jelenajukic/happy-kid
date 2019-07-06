import React, { Component } from 'react'
import TimeLineMessage from "./TimeLineMessage"
import AdminService from '../../admin/AdminService';
import { Link, Route, Switch } from 'react-router-dom';
import NewChild from './NewChild';
import EditParent from './EditParent';
import AdminMenu from './AdminMenu';
import Agenda from './Agenda'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import NavBar from "../Main/NavBar";
import AuthService from '../../auth/AuthService';
import ChatForAdmin from './ChatForAdmin'
import "./AdminPage.css"
import AdminHomePage from './AdminHomePage'

const moment = extendMoment(Moment);
export default class AdminPage extends Component {

  state = {
    parents: [],
    dateString: moment().format("YYYY-MM-DD")
  }

  service = new AdminService();
  authService = new AuthService();

  componentDidMount() {
    console.log("I am in AdminPage didmount")
    console.log("This is this", this)
    this.service.parents()
      .then(result => {
        console.log("These are parents from User", result);
        this.setState({
          parents: result
        })
      })
      .catch(error => console.log(error))
  }

  renderParents = () => {
    let parentsToRender = this.state.parents.map((parent, index) => <Link key={index} to={`/${parent._id}`}>{parent.username}</Link>)
    return parentsToRender
  }

  logOut = () => {
    this.authService.logout()
      .then(response => {
        console.log("LogOut returns:", response);
        this.props.updateStateInGS(null, false);
      })
  }

  render() {
    return (
      <div className="AdminPage">
        <NavBar state={this.props.state} logOut={this.logOut} />
        <div style={{ display: "flex", width: "70%", height: "600px", margin: "100px auto", justifyContent: "space-between" }}>
          <AdminMenu />
          <div style={{ width: "80%", height: "600px" }}>
            <Switch>
              <Route exact path="/" render={(props) => <AdminHomePage state={this.state} />} />
              <Route path="/edit-parent" render={(props) => <EditParent state={this.state} />} />
              <Route path="/new-kid" render={(props) => <NewChild />} />
              <Route path="/send-message" render={(props) => <TimeLineMessage />} />
              <Route path="/agenda" render={(props) => <Agenda dateString={this.state.dateString} />} />
              <Route path="/chat" render={(props) => <ChatForAdmin user={this.props.state.user.username} />} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
