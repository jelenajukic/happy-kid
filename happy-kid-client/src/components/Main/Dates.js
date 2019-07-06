import React, { Component } from 'react'

export default class Dates extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", width:'60%', margin:"0 auto"}}>
        {this.props.createDaysForMonth()}
      </div>
    )
  }
}
