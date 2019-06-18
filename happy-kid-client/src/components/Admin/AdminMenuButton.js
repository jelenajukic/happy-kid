import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class AdminMenuButton extends Component {

  style = {
    width:"100px",
    height:"100px",
    backgroundColor: "yellow"
  }

  render() {
    return (
      <div style={this.style}>
        <Link to={this.props.linkTo}>{this.props.value}</Link>
      </div>
    )
  }
}
