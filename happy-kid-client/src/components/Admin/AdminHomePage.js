import React, { Component } from 'react'

export default class AdminHomePage extends Component {
  render() {
    return (
      <div>
        <fieldset style={{height: "400px", display: "flex", flexDirection:"column", alignItems: "flex-start", padding: "20px", justifyContent:"space-around"}}>
          <legend>HappyKid &#x10E6;</legend>
          <h2>Hello, let's do some nice things for our parents and kids  &#x10E6;</h2>
          <ul style={{ listStyleType: "none"}}>
            <li>You can add new child in ADD-KID section</li>
            <li>You can connect parent with kid(s) in CONNECT section</li>
            <li>You can sen a message in SEND MESSAGE section</li>
            <li>You can check agenda in AGENDA section</li>
            <li>You can chat with our parents in CHAT section</li>
          </ul>
        </fieldset>
      </div>
    )
  }
}

