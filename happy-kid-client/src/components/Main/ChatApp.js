import React, { Component } from 'react'
import MessageList from './MessageList'
import "./ChatApp.css"
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessageForm from './SendMessageForm';
import UserService from '../../user/UserService';


let chatManager;

export default class ChatApp extends Component {

  userservice = new UserService();

  state = {
    messages: [],
    currentUser: null,
    roomId: "",
  }

  componentDidMount() {
    console.log("ok")
    this.userservice.createChatUser(this.props.user)
      .then((response) => {
        console.log('ChatApp user:', response)
        chatManager = new ChatManager({
          instanceLocator: "v1:us1:f2e42c61-c347-45fe-a756-ad689284eda6",
          userId: this.props.user,
          tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f2e42c61-c347-45fe-a756-ad689284eda6/token' })
          //tokenProvider: new TokenProvider({ url: 'your.auth.url' })
        })
        return ("chat manager created")
      })
      .then(() => {
        this.manageUserAndRoom()
      })
      .catch(err => console.log("error in DidMount", err))
  }

  manageUserAndRoom = () => {
    chatManager.connect()
      .then(currentUser => {
        this.setState({ currentUser }, () => {
          this.roomExists()
            .then(result => {
              if (result) {
                this.getRoomIdIfExists()
                  .then(room => this.setState({ roomId: room.id }, () => this.subscribeToChatRoom()))
              } else {
                this.state.currentUser.createRoom({
                  name: this.props.user,
                  private: true,
                  addUserIds: ['admin'],
                }).then(room => {
                  console.log(`Created room called ${room.name}`)
                  this.setState({ roomId: room.id });
                  this.subscribeToChatRoom();
                })
                  .catch(err => {
                    console.log(`Error creating room ${err}`)
                  })
              }
            })
        })
      })
  }

  roomExists = () => {
    return new Promise((resolve, reject) => {
      this.userservice.getAllRooms()
        .then(rooms => {
          if (rooms.some(room => room.name === this.props.user)) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
    })
  }

  getRoomIdIfExists = () => {
    return new Promise((resolve, reject) => {
      let roomToSubscribe;
      this.userservice.getAllRooms()
        .then(rooms => { roomToSubscribe = rooms.find(room => room.name === this.props.user); resolve(roomToSubscribe) })
    })
  }

  subscribeToChatRoom = () => {
    this.state.currentUser.subscribeToRoomMultipart({
      roomId: this.state.roomId,
      hooks: {
        onMessage: message => {
          console.log("received message", message)
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
      //  messageLimit: 10
    })
      .then(() => console.log("subscribed to:", this.state.roomId))
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

  render() {
    return (
      <div className="ChatApp">
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    )
  }
}
