import React, { Component } from 'react'
import AdminService from '../../admin/AdminService';

export default class NewChild extends Component {

  service = new AdminService();

  state = {
    kidName: "",
    kidLastName: "",
    group: "",
    redirect: false
  }

  style = {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    width: "30%",
    justifyContent: "center",
    margin: "0 auto",
    alignItems: "center"
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
      .then(result => this.setState({redirect:true}))
      .catch(error => console.log(error))
  }

  render() {
    
    if (this.state.redirect === true) {
      window.history.replaceState(null, null, "/"); //it will clean history
      window.location.reload();
      // return <Redirect to='/' />
    }

    return (
      <fieldset>
        <legend>Add a kid</legend>
        <form onSubmit={this.addKidToDB} style={this.style}>
          <label>First Name</label>
          <input type="text" name="kidName" onChange={this.handleChangeEvent} placeholder="Type name" /><br></br>
          <label>LastName</label>
          <input type="text" name="kidLastName" onChange={this.handleChangeEvent} placeholder="Type lastName" /><br></br>
          <label>Group</label>
          <input type="text" name="group" onChange={this.handleChangeEvent} placeholder="Type group" /><br></br>
          <input type="submit" value="add-kid" />
        </form>
      </fieldset>
    )
  }
}
