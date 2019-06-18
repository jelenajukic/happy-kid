import React, { Component } from 'react';
import './Content.css';
// import MenuCard from '../MenuCard/MenuCard'
import { Link } from 'react-router-dom'
// import Lightbox from 'react-images'

export default class Content extends Component {

  // timeLineMessagesToRender = this.props.timeLineMessages.map((message) => message.images.map((image, index) => <img style={{width:"100px", height:"100px"}} src={image} key={index} alt={index} />))
  //  timeLineMessagesToRender = this.props.timeLineMessages.map((message) => <div><Gallery images={message.images}/></div>)

  // render() {
  //   console.log("images to render:", this.timeLineMessagesToRender)
  //   return (
  //     <div className="Content">
  //       {this.timeLineMessagesToRender}
  //     </div>
  //   )
  // }
  render() {
    return (
      <div>
        hello
        <Link to={{
          pathname: '/test1',
          state: {
            index: 0
          }
        }} >Test1</Link>
        <Link to={{
          pathname: '/test2',
          state: {
            index: 1
          }
        }}
        >Test2</Link>

        <Link to={{
          pathname: '/test3',
          state: {
            index: 2
          }
        }}>Test3</Link>
      </div>
    )

  }


}
