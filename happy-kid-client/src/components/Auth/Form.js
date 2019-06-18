import React, { Component } from 'react'

export default class Form extends Component {

  state = {
    username: "",
    password: "",
    error: false,
    errorText: ""
  }

  handleChangeEvent = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmitEvent = (e) => {
    console.log(this.state)
    console.log("form",this.props)
    e.preventDefault();
    this.props.formAction(this.state.username, this.state.password)
      .then(response => {
        console.log("Response is: ", response); //do i need to keep password!
        this.props.updateState(response)
      })
      .catch(error => {
        console.log("here is error:", error)
        this.setState({
          error: true,
          errorText: error
        }, () => {console.log(this.state)})
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitEvent} method="POST">
        <div>
          <label>Username</label>
          <input type="text" name="username" onChange={this.handleChangeEvent} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChangeEvent} />
        </div>
        <div>
          <input type="submit" value={this.props.buttonText} />
        </div>
        <p>{this.state.error? this.state.errorText.response.statusText: null}</p>
      </form>
    )
  }
}
