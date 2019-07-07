import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import TimeLineMessageKid from "./TimeLineMessageKid";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export default class TimeLineMessageUser extends Component {

  state = {
    timeLineMessages: this.props.timeLineMessages //2D array. 1D array inside it can be empty (no messages for kids added)
  }

  //this function makes links to kid's time-line messages
  renderKidsLink = () => {
    return this.state.timeLineMessages.length !== 0 ? //if first kid do not have message we will not see messages of other kids
      this.state.timeLineMessages.map((message, index) =>
        <li key={index} style={{ textDecoration: "none" }}><Link
          id={message[0].kid._id}
          style={{
            textDecoration: "none",
            display: "block",
            padding: "10px",
            background: '#54008B',
            color: "#fff",
            borderRadius: "10px"
          }}
          to={{
            pathname: `/${message[0].kid._id}`,
            // pathname: (index ===0) ? "/" :`/${message[0].kid._id}`,
            state: {
              message: message.map(item => {
                return {
                  images: item.images,
                  messageTitle: item.messageTitle,
                  messageBody: item.messageBody,
                  created: moment(item.created_at).format("LLLL"),
                  index: item.kid._id //uniq identifier. Used inside componentWillReceiveProps(TimeLineMessafeKid component)
                }
              })
            }
          }}>{message[0].kid.kidName}</Link></li >) : null
  }

  componentDidMount() {
    // window.addEventListener('load', this.handleLoad);
    // document.getElementById(`${this.state.timeLineMessages[0][0].kid._id}`).click()
    // this.props.history.push(`/${this.state.timeLineMessages[0][0].kid._id}`)
  }

  // handleLoad = () => {
  //   document.getElementById(`${this.state.timeLineMessages[0][0].kid._id}`).click()
  // }

  render() {
    return (
      <div className="TimeLineMessageUser" style={{ background: 'linear-gradient(to right bottom, #E10083,#FFD91D, #7BCB56)', height: "100%" }}>
        <ul style={{ display: "flex", margin: "0 auto", listStyleType: "none", padding: "20px", justifyContent: "space-around", width: "60%" }}>
          {this.renderKidsLink()}
        </ul>
        <Route path="/:id" render={(props) => <TimeLineMessageKid {...props} />} />
      </div>
    )
  }
}

