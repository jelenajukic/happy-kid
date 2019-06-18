import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class EditParentForm extends Component {

  state = {
    parent: this.props.location.state.parent
  }


  // renderAllKids = () => {

  // }
  // componentDidMount() {
  //   console.log("I am in AdminPage didmount")
  //   this.service.findParent()
  //     .then(result => {
  //       console.log("This are data about parent", result);
  //       this.setState({
  //         users: result
  //       })
  //     })
  //     .catch(error => console.log(error))
  // }
  // componentDidMount() {


  //   }


  render() {
    return (
      <div>

        edit-form
        <form onSubmit={this.addKidToDB} style={{display:"flex", flexDirection:"column"}}>
          <label>First Name Parent</label>
          <input type="text" name="username" value={this.state.parent.username} onChange={this.handleChangeEvent} />


          <input type="submit" value="add-kid" />
        </form>
      </div>
    )
  }
}
