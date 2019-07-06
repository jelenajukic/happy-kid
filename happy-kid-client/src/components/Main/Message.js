import React, { Component } from 'react'

export default class Message extends Component {
  render() {
    return (
      <div className="message" style={{ display: "flex" }}>
        <div className="message-username">{this.props.username}: </div>
        <div className="message-text">{this.props.text}</div>
      </div>
    )
  }
}
