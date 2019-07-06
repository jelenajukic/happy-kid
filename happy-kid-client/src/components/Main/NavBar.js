import React, { Component } from 'react'
import {Link} from "react-router-dom";
import './NavBar.css'

export default class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <span>Welcome, {this.props.state.user.username}</span>
        <Link to='/' onClick={this.props.logOut} id="logout">LogOut</Link>
      </div>
    )
  }
}
