import React, { Component } from 'react'
// import './MenuCard.css'
import {Link} from 'react-router-dom'

export default class MenuCard extends Component {
  render() {
    return (
     <div className="MenuCard" style={{width:"80%", height:"30%"}}>
       <img src={this.props.imgURL} alt="img" style={{width:"100px", height:"100px"}} />
      <span> <Link to={this.props.linkText}>{this.props.linkText}</Link></span>
     </div>
    )
  }
}
