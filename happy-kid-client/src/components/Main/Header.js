import React, { Component } from 'react';
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div id="logo-div">
          <img src="../../logo.jpg" alt="logo" />
        </div>
        <div id="images-carousel"></div>
      </div>
    )
  }
}
