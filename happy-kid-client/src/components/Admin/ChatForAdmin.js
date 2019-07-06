import React, { Component } from 'react'
import MessageList from '../Main/MessageList'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessageForm from '../Main/SendMessageForm';
import UserService from '../../user/UserService';
import { Route, Link } from 'react-router-dom'
import './ChatAppAdmin.css'

let chatManager;

export default class ChatApp extends Component {

  userservice = new UserService();
  state = {
    messages: [],
    currentUser: null,
    userRooms: [],
    roomId: "",
    roomIsActive: false
  }

  componentDidMount() {
    chatManager = new ChatManager({
      instanceLocator: process.env.REACT_APP_instanceLocator,
      userId: this.props.user,
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f2e42c61-c347-45fe-a756-ad689284eda6/token' })
      //tokenProvider: new TokenProvider({ url: 'your.auth.url' })
    });

    chatManager.connect()
      .then(currentUser => {
        this.setState({ currentUser })
        console.log("CurrentUser is:", this.state.currentUser)
        this.userservice.getUserRooms(this.props.user)
          .then(result => {
            console.log("User rooms:", result);
            this.setState({ userRooms: result })
          })
      })
      .catch(err => console.log(err))
  }

  subscribeToChatRoom = (roomId) => {
    this.state.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          console.log("received message", message)
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
      .then(() => console.log("subscribed to:", roomId))
  }

  sendMessage = (text) => {
    this.state.currentUser.sendSimpleMessage({
      text: text,
      roomId: this.state.roomId
    })
      .then(() => {
        var chatEl = document.getElementsByClassName("message-list")[0];
        chatEl.scrollTop = chatEl.scrollHeight - 20
        console.log("element is", chatEl, chatEl.scrollHeight + 20, chatEl.scrollHeight)
      })
  }

  handleClickOnRoom = (e) => {
    e.preventDefault();
    const roomId = e.target.getAttribute("roomid");
    this.setState({
      roomId: roomId,
      messages: []
    }, () => {
      console.log("Handle change roomId:", this.state.roomId);
      this.subscribeToChatRoom(this.state.roomId);
      console.log("I am subscribed to", this.state.roomId);
      this.setState({ roomIsActive: true })
    })
  }

  updateMessages = (messages) => {
    this.setState({ messages: messages })
  }

  renderChatRoom = () => {
    return this.state.userRooms.map((room, index) => <div className="room-buttons" key={index} onClick={this.handleClickOnRoom}><Link roomid={room.id} to="/chat/send-chat">{room.name}</Link></div>)
  }

  render() {
    return (
      <div className="ChatAppAdmin">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Rooms you can join:</span> {this.renderChatRoom()}
        </div><br></br>
        {this.state.roomIsActive === true ? <MessageList messages={this.state.messages} /> : null}
        {this.state.roomIsActive === true ? <div id="ChatForm" >
          <Route path="/chat/send-chat" render={(props) => <SendMessageForm {...props} sendMessage={this.sendMessage} updateMessages={this.updateMessages} roomId={this.state.roomId} />} />
        </div> : null}
      </div>
    )
  }
}
