import React, { Component } from 'react'
import Gallery from 'react-grid-gallery';
import './TimeLineMessageKid.css'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class TimeLineMessageKid extends Component {

  state = {
    message: this.props.location.state.message,
    items: [...this.props.location.state.message].splice(0, 3),
    hasMore: true,
    index: 3//used to define splice scope for messages that has to be rendered inside InfiniteScroll component
  }

  /*Component has to render again if props are changed. It is needed to switch between kids cards.
  index is uniq identifier which helps to find out if props are changed*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state.message[0].index !== this.props.location.state.message[0].index) {
      this.setState({
        message: nextProps.location.state.message,
        items: [...nextProps.location.state.message].splice(0, 5),
        hasMore: true,
        index: 5
      }, () => console.log("New state is", this.state))
    }
  }

  timeLineMessagesToRender = () => {
    return this.state.items.map((messageItem, index) =>
      <div key={index} style={{ borderRadius: "10px", border: "4px solid #fff", backgroundColor: "#7BCB56", margin: "10px auto", height: "auto", width: "80%", padding: "10px" }}>
        <p>{messageItem.created}</p>
        <h2>{messageItem.messageTitle}</h2>
        <p>{messageItem.messageBody}</p>
        {messageItem.images.length !== 0 ? <Gallery images={messageItem.images} backdropClosesModal={true} /> : null}
      </div>
    )
  }

  fetchMoreData = () => {
    this.setState({
      items: this.state.items.concat([...this.state.message].splice(this.state.index, this.state.index + 5)),
      hasMore: this.state.index >= this.state.message.length ? false : true,
      index: this.state.index + 10,
    })
  };

  render() {
    return (
      <div id="scrollableDiv" style={{ height: "400px", overflow: "auto", scrollbarWidth: "none" }} >
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          useWindow={false}
          scrollableTarget="scrollableDiv"
          getScrollParent={() => this.scrollParentRef}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.timeLineMessagesToRender()}
        </InfiniteScroll>
      </div>
    )
  }
}


