import React, { Component } from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import AdminService from '../../admin/AdminService';

const moment = extendMoment(Moment);

export default class Agenda extends Component {

  state = {
    agenda: [],
    dateString: moment().format("MM/DD/YYYY"),
    notificationsPerDay: []
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
    return this.state.notificationsPerDay.map(notification => <div style={{ dipslay: "flex" }}><p>{notification.notification}</p><p>{notification.kidID.kidName}</p></div>)
  }

  render() {
    return (
      <div>
        <input type="date" value={this.state.dateString} onChange={this.handleChange} />
        {this.renderNotificationsPerDay()}
      </div>
    )
  }
}
