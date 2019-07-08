import React, { Component } from 'react'
import AdminMenuButton from "./AdminMenuButton"

export default class AdminMenu extends Component {

  style = {
    display: "flex",
    height: "700px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  }

  render() {
    return (
      <div style={this.style}>
        <AdminMenuButton value="HOME" linkTo="/" />
        <AdminMenuButton value="ADD KID" linkTo="/new-kid" />
        <AdminMenuButton value="CONNECT" linkTo="/edit-parent" />
        <AdminMenuButton value="SEND MESSAGE" linkTo="/send-message" />
        <AdminMenuButton value="AGENDA" linkTo="/agenda" />
        <AdminMenuButton value="CHAT" linkTo="/chat" />
      </div>
    )
  }
}
