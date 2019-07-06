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
        <div key={index}>
          <input type="radio" name="kidToSelect" value={kid._id} />
          <label>{kid.kidName}</label>
        </div>
      )
    return kidsWithDetailsArr;
  }

  handleChangeEvent = (e) => {
    console.log('Files are', e.target.files)
    const files = e.target.files;
    if (files.length === 0) {
      return alert('No file selected.');
    }
    for (let i = 0; i < files.length; i++) {
      this.getSignedRequest(files[i])
    }
  }

  handleInputFormEvent = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  getSignedRequest = (file) => {
    const xhr = new XMLHttpRequest();
    console.log("xhr is:", xhr);
    xhr.open('GET', `https://happy-kid.herokuapp.com/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    // xhr.open('GET', `http://localhost:5000/sign-s3?file-name=${file.name}&file-type=${file.type}`);
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
            thumbnailWidth: 150,
            thumbnailHeight: 150,
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
    let imagesToRender = this.state.messageImages.map((image, index) => <img key={index} src={image.src} alt={index} style={{ height: "100%", width: "auto", marginRight: "2px" }} />)
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
      <fieldset>
        <legend>Send message for kid</legend>
        <div style={{ height: "100%", width: "80%", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <form method="POST" onSubmit={this.saveMessage} style={{ display: "flex", flexDirection: "column", height: "600px", justifyContent: "space-around", width: "40%" }}>
            <div style={{ textAlign: "left" }}>
              <label>Search for a kid:</label><br />
              <input type="text" name="kid" onChange={this.handleChangeKid} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              {this.makeListOfKids()}
            </div>
            <div style={{ textAlign: "left" }}>
              <label>Message Title:</label>
              <input type="text" name="messageTitle" onChange={this.handleInputFormEvent} /><br /><br />
              <label>Message Text:</label><br />
              <textarea name="messageBody" rows="10" cols="30" onChange={this.handleInputFormEvent} /><br />
              <input type="submit" value="send message" />
            </div>
          </form>
          <div style={{ display: "flex", flexDirection: "column", height: "350px", justifyContent: "space-around" }}>
            <input type="file" id="file-input" onChange={this.handleChangeEvent} multiple="multiple" /><br />
            <div style={{ display: "flex", height: "200px", flexWrap: "wrap" }}>
              {this.state.messageImages.length === 0 ? null : this.renderImages()}
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
}
