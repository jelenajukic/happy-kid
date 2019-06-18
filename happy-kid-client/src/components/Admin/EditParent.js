import React, { Component } from 'react'
import AdminService from '../../admin/AdminService';
import { Link, Switch, Route } from "react-router-dom";
import EditParentForm from './EditParentForm';
// import EditParentForm from './EditParentForm'

let array = []
export default class EditParent extends Component {

  state = {
    parents: [],
    searchedParent: [],
    kids: [],
    searchedKid: [],
    parentToEdit: [],
    kidToAdd: []
  }

  service = new AdminService();

  handleChange = (event) => {
    let searchValue = event.target.value;
    let searchedParent = this.state.parents.filter(parent => parent.username.toLowerCase().startsWith(searchValue))
    this.setState({
      searchedParent: searchedParent
    })
  }

  handleChangeKid = (event) => {
    let searchValue = event.target.value;
    let searchedKid = this.state.kids.filter(kid => kid.kidName.toLowerCase().startsWith(searchValue) || kid.kidLastName.toLowerCase().startsWith(searchValue))
    this.setState({
      searchedKid: searchedKid
    })
  }

  handleOnClickEvent = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target
    array.push(value)
    this.setState({
      [name]: array
    })
  }

  // renderSearchForKids = () => {
  //   document.getElementById("input-kid").innerHTML = `<label>Search for a kid:</label>
  //   <input type="text" name="kid" onChange={this.handleChangeKid} />
  //   <div style={{ display: "flex", flexDirection: "column" }}>
  //    this.render (){t}
  //   </div>`
  // }

  makeListOfParents = () => {
    console.log(this.state.parents)
    let parentsWithDetailsArr = this.state.searchedParent
      .map((parent, index) =>
        <div>
          <input type="radio" name="parentToEdit" value={parent._id} />
          <label>{parent.username}</label>
        </div>
      )
    return parentsWithDetailsArr;
  }

  makeListOfKids = () => {
    console.log(this.state.parents)
    let kidsWithDetailsArr = this.state.searchedKid
      .map((kid, index) =>
        <div>
          <input type="checkbox" name="kidToAdd" value={kid._id} />
          <label>{kid.kidName}</label>
        </div>
      )
    return kidsWithDetailsArr;
  }

  componentDidMount() {
    this.service.parents()
      .then((result) => {
        console.log("Parents are:", result);
        this.setState({
          parents: result,
          searchedParent: result
        })
      });

    this.service.kids()
      .then((result) => {
        console.log("Kids are:", result);
        this.setState({
          kids: result,
          searchedKid: result
        })
      })
  }

  getChecked = () => {
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    var radioboxes = document.querySelectorAll("input[type=radio]");
    var checkedCB = [];
    var checkedRB = [];

    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      if (checkbox.checked) checkedCB.push(checkbox.value);
    }

    for (var j = 0; j < radioboxes.length; j++) {
      var radiobox = radioboxes[j];
      if (radiobox.checked) checkedRB.push(radiobox.value);
    }

    return [checkedCB, checkedRB];
  }

  editParent = () => {
    let arrayToSave = this.getChecked();
    this.service.editParent(arrayToSave[1], arrayToSave[0])
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.editParent}>
          <label>Search for a parent:</label>
          <input type="text" name="parent" onChange={this.handleChange} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {this.makeListOfParents()}
            {/* <Route path="/edit-parent/:id" render={(props) => <EditParentForm {...props} />} /> */}
          </div>
          <div id="input-kid">
            <label>Search for a kid:</label>
            <input type="text" name="kid" onChange={this.handleChangeKid} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.makeListOfKids()}
            </div>
          </div>
          <input type="Submit" />
        </form>
        <Route path="/edit-parent/:id" render={(props) => <EditParentForm {...props} />} />
      </div>
    )
  }
}
