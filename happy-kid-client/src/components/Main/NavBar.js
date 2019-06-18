import React, { Component } from 'react'
import {Link} from "react-router-dom";
import './NavBar.css'

export default class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <span>{this.props.state.user.username}</span>
        <Link to='/' onClick={this.props.logOut}>LogOut</Link>
      </div>
    )
  }
}
