import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MenuCard extends Component {

  style = {
    width: "80%",
    background: 'linear-gradient(to right bottom, #E10083,#FFD91D, #7BCB56,#fff)',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: "0 auto",
    textDecoration: "none",
    borderRadius: "10px",
    color: "#43008C"
  }

  render() {
    return (
      <Link to={this.props.linkText} style={this.style}>
        <i className={this.props.classList} />
        <span>{this.props.spanValue}</span>
      </Link>
    )
  }
}
