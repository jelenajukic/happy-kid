import React, { Component } from 'react'
import AdminMenuButton from "./AdminMenuButton"

export default class AdminMenu extends Component {

  style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "blue"
  }
  render() {
    return (
      <div style={this.style}>
        <AdminMenuButton value="HOME" linkTo="/" />
        <AdminMenuButton value="ADD KID" linkTo="/new-kid" />
        <AdminMenuButton value="EDIT PARENT" linkTo="/edit-parent" />
        <AdminMenuButton value="SEND MESSAGE" linkTo="/send-message"/>
        <AdminMenuButton value="AGENDA" linkTo="/agenda"/>
      </div>
    )
  }
}
