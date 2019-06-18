import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import TimeLineMessageKid from "./TimeLineMessageKid"

export default class TimeLineMessageUser extends Component {

  state = {
    timeLineMessages: this.props.timeLineMessages //2D array. 1D array inside it can be empty (no messages for kids added)
  }

  //this function makes links to kid's time-line messages

  renderKidsLink = () => {
    return this.state.timeLineMessages[0].length !== 0 ?
      this.state.timeLineMessages.map(message =>
        <li><Link to={{
          pathname: `/${message[0].kid._id}`,
          state: {
            message: message.map(item => {
              return {
                images: item.images,
                messageTitle: item.messageTitle,
                messageBody: item.messageBody,
                index: item.kid._id //uniq identifier. Used inside componentWillReceiveProps(TimeLineMessafeKid component)  
              }
            })
          }
        }}>{message[0].kid.kidName}</Link></li>) : null
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderKidsLink()}
        </ul>
        <Route path="/:id" render={(props) => <TimeLineMessageKid {...props} />} />
      </div>
    )
  }
}

