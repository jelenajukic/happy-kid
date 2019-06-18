import React, { Component } from 'react'
import Gallery from 'react-grid-gallery';
import './TimeLineMessageKid.css'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class TimeLineMessageKid extends Component {

  state = {
    message: this.props.location.state.message,
    items: [...this.props.location.state.message].splice(0, 1),
    hasMore: true,
    index: 1//used to define splice scope for messages that has to be rendered inside InfiniteScroll component
  }

  /*Component has to render again if props are changed. It is needed to switch between kids cards.
  index is uniq identifier which helps to find out if props are changed*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state.message[0].index !== this.props.location.state.message[0].index) {
      this.setState({
        message: nextProps.location.state.message,
        items: [...nextProps.location.state.message].splice(0, 1),
        hasMore: true,
        index: 1
      }, () => console.log("New state is", this.state))
    }
  }

  timeLineMessagesToRender = () => {
    return this.state.items.map(messageItem =>
      <div style={{backgroundColor:"grey", margin:5}}>
        <h2>{messageItem.messageTitle}</h2>
        <p>{messageItem.messageBody}</p>
        {messageItem.images.length!==0?<Gallery images={messageItem.images} backdropClosesModal={true} />:null}
      </div>
    )
  }

  fetchMoreData = () => {
    this.setState({
      items: this.state.items.concat([...this.state.message].splice(this.state.index, this.state.index + 1)),
      hasMore: this.state.index >= this.state.message.length ? false : true,
      index: this.state.index + 2,
    })
  };

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {this.timeLineMessagesToRender()}
      </InfiniteScroll>
    )
  }
}


