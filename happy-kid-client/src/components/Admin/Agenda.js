import React, { Component } from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import AdminService from '../../admin/AdminService';
import "./Agenda.css"

const moment = extendMoment(Moment);

export default class Agenda extends Component {

  state = {
    agenda: [],
    dateString: moment().format("MM/DD/YYYY"),
    notificationsPerDay: []
  }

  tableStyle = {
    borderCollapse: "collapse",
    border: "2px solid rgb(200,200,200)",
    letterSpacing: "1px",
    fontSize: "0.8rem"
  }

  service = new AdminService();

  handleChange = (e) => {
    e.preventDefault();
    console.log("hello")
    this.setState({
      dateString: e.target.value
    }, () => {
      this.service.agenda(this.state.dateString)
        .then(result => this.setState({ notificationsPerDay: result }, () => console.log("notifications to render", this.state.notificationsPerDay)))
    })
  }

  componentDidMount() {
    this.setState({
      dateString: this.props.dateString
    }, () => {
      this.service.agenda(this.state.dateString)
        .then(result => this.setState({ notificationsPerDay: result }, () => console.log("notifications to render", this.state.notificationsPerDay)))
    })
  }

  renderNotificationsPerDay = () => {
    return this.state.notificationsPerDay.map((notification,index) =>
      <tr key={index}>
        <td>{notification.kidID.kidName}</td>
        <td>{notification.notification}</td>
      </tr>)
  }

  render() {
    return (
      <div className="Agenda">
        <input type="date" value={this.state.dateString} onChange={this.handleChange} />
        <table>
          <thead>
            <tr>
              <th colSpan="2">Agenda</th>
            </tr>
            <tr id="info">
              <th>Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.renderNotificationsPerDay()}
          </tbody>
        </table>
      </div>
    )
  }
}
