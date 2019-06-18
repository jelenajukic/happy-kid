import React, { Component } from 'react';
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div id="logo-div">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png" alt="logo" />
        </div>
        <div id="images-carousel"></div>
      </div>
    )
  }
}
