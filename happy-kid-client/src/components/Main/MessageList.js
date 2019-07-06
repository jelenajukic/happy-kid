import React, { Component } from 'react'
import Message from "./Message"
import './ChatApp.css'

export default class MessageList extends Component {

  renderMessages = () => {
    return this.props.messages.map((message, index) => {
      console.log("Messages are:", message)
      return <Message key={index} username={message.senderId} text={message.parts[0].payload.content} />
    }
    )
  }

  render() {
    return (
      <div className="message-list">
        {this.renderMessages()}
      </div>
    )
  }
}
