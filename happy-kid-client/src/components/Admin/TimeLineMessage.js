import React, { Component } from 'react'
import AdminService from '../../admin/AdminService';

export default class TimeLineMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageImages: [],
      kids: [],
      searchedKid: [],
      messageTitle: "",
      messageBody: ""
    }
  }

  service = new AdminService();

  handleChangeKid = (event) => {
    let searchValue = event.target.value;
    let searchedKid = this.state.kids.filter(kid => kid.kidName.toLowerCase().startsWith(searchValue) || kid.kidLastName.toLowerCase().startsWith(searchValue))
    this.setState({
      searchedKid: searchedKid
    })
  }

  makeListOfKids = () => {
    console.log(this.state.kids)
    let kidsWithDetailsArr = this.state.searchedKid
      .map((kid, index) =>
        <div>
          <input type="radio" name="kidToSelect" value={kid._id} />
          <label>{kid.kidName}</label>
        </div>
      )
    return kidsWithDetailsArr;
  }

  handleChangeEvent = (e) => {
    console.log(e.target.files)
    const files = e.target.files;
    const file = files[0];
    const file1 = files[1]
    console.log("Files", file)
    if (files.length === 0) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file)
    this.getSignedRequest(file1)
  }

  handleInputFormEvent = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  getSignedRequest = (file) => {
    const xhr = new XMLHttpRequest();
    console.log("xhr is:", xhr)
    xhr.open('GET', `http://localhost:5000/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("text is:", xhr.responseText)
          const response = JSON.parse(xhr.responseText);
          console.log("response is", response)
          this.uploadFile(file, response.signedRequest, response.url);
        }
        else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  uploadFile = (file, signedRequest, url) => {
    const xhr = new XMLHttpRequest();
    debugger
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("element je", document.getElementById('preview'))
          this.state.messageImages.push({
            src: url,
            thumbnail: url,
            thumbnailWidth: 320,
            thumbnailHeight: 174,
          })
          this.setState({
            messageImages: this.state.messageImages
          })
          console.log(this.state.messageImages)
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  componentDidMount() {
    this.service.kids()
      .then((result) => {
        console.log("Kids are:", result);
        this.setState({
          kids: result,
          searchedKid: result
        })
      })
  }

  renderImages = () => {
    let imagesToRender = this.state.messageImages.map((image, index) => <img key={index} src={image.src} alt={index} />)
    return imagesToRender
  }

  getChecked = () => {
    var radioboxes = document.querySelectorAll("input[type=radio]");
    var checkedRB = [];
    for (var j = 0; j < radioboxes.length; j++) {
      var radiobox = radioboxes[j];
      if (radiobox.checked) checkedRB.push(radiobox.value);
    }
    return checkedRB;
  }

  saveMessage = (e) => {
    e.preventDefault();
    let arrayToSave = this.getChecked();
    this.service.addMessage(arrayToSave[0], this.state.messageImages, this.state.messageTitle, this.state.messageBody)
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <form method="POST" onSubmit={this.saveMessage}>
          <label>Search for a kid:</label>
          <input type="text" name="kid" onChange={this.handleChangeKid} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {this.makeListOfKids()}
          </div>
          <label>Message Title:</label>
          <input type="text" name="messageTitle" onChange={this.handleInputFormEvent} />
          <label>Message Text:</label>
          <textarea name="messageBody" rows="10" cols="30" onChange={this.handleInputFormEvent}>...</textarea>
          <input type="submit" value="send message" />
        </form>
        <input type="file" id="file-input" onChange={this.handleChangeEvent} multiple="multiple" />
        <p id="status">Please select a file</p>
        {this.state.messageImages.length === 0 ? null : this.renderImages()}
      </div>
    )
  }
}
