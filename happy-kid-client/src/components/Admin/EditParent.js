import React, { Component } from 'react'
import AdminService from '../../admin/AdminService';

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

  makeListOfParents = () => {
    console.log(this.state.parents)
    let parentsWithDetailsArr = this.state.searchedParent
      .map((parent, index) =>
        <div key={index}>
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
        <div key={index}>
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
      .then(result => console.log('result in edit is:', result))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.editParent}>
          <fieldset>
            <legend>Search for a parent:</legend><br></br>
            <div className="input-info" >
              <input type="text" name="parent" onChange={this.handleChange} placeholder="Type name" /><br />
              <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", padding: "5px" }}>
                {this.makeListOfParents()}
              </div>
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>Search for a kid:</legend><br />
            <div className="input-info">
              <input type="text" name="kid" onChange={this.handleChangeKid} placeholder="Type name" />
              <div style={{ padding: "5px", display: "flex", flexDirection: "column", }}>
                {this.makeListOfKids()}
              </div>
            </div>
          </fieldset><br />
          <input type="Submit" />
        </form>
      </div>
    )
  }
}
