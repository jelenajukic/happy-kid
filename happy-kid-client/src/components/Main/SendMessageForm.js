import React, { Component } from 'react';
import UserService from '../../user/UserService';

export default class SendMessageForm extends Component {
  state = {
    message: "",
    roomId: ""
  }

  userservice = new UserService();

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    })
  }

  componentDidMount() {
    this.userservice.fetchRoomMessages(this.props.roomId)
      .then((messages) => this.setState({
        messages: messages,
        roomId: this.props.roomId
      }))
      .catch(err => console.log(err))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roomId !== this.props.roomId) {
      this.setState({
        roomId: nextProps.roomId,
      }, () => {
        this.userservice.fetchRoomMessages(this.state.roomId)
          .then((messages) => this.setState({
            messages: messages,
          }, () => this.props.updateMessages(this.state.messages)))
          .catch(err => console.log(err))
      })
    }
    else {
      this.userservice.fetchRoomMessages(this.props.roomId)
        .then(messages => this.setState({
          messages: messages,
        }, () => this.props.updateMessages(this.state.messages)))
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>
        <form className="send-message-form" onSubmit={this.handleSubmit} autoComplete="off">
          <input id="type-message"
            placeholder="Type the message and press ENTER"
            type="text"
            onChange={this.handleChange}
            value={this.state.message} />
        </form>
      </div>
    )
  }
}
