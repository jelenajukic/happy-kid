import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AdminMenuButton extends Component {

  style = {
    width: "90%",
    height: "15%",
    background: 'linear-gradient(to right bottom, #E10083,#FFD91D, #7BCB56,#fff)',
    borderRadius: "10px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
  }

  render() {
    return (
      <Link style={this.style} to={this.props.linkTo}>
        <div style={{ margin: "0 auto" }}>
          {this.props.value}
        </div>
      </Link>
    )
  }
}
