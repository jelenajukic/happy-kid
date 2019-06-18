import React, { Component } from 'react'
import AdminService from '../../admin/AdminService';
import { Link, Switch, Route } from 'react-router-dom'
import TimeLineMessage from './TimeLineMessage';
import AdminMenu from './AdminMenu';
import EditParent from './EditParent';
// import Test from './'


export default class NewChild extends Component {

  service = new AdminService();

  state = {
    kidName: "",
    kidLastName: "",
    group: ""
  }

  style = {
    display: "flex"
  }

  handleChangeEvent = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  addKidToDB = (e) => {
    e.preventDefault()
    this.service.addKid(this.state.kidName, this.state.kidLastName, this.state.group)
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  render() {
    return (

      <div style={this.style}>
        <form onSubmit={this.addKidToDB}>
          <label>First Name</label>
          <input type="text" name="kidName" onChange={this.handleChangeEvent} />
          <label>LastName</label>
          <input type="text" name="kidLastName" onChange={this.handleChangeEvent} />
          <label>Group</label>
          <input type="text" name="group" onChange={this.handleChangeEvent} />
          <input type="submit" value="add-kid" />
        </form>
      </div>
    )
  }
}
