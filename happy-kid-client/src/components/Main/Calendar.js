import React, { Component } from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import UserService from '../../user/UserService';
import { Route } from 'react-router-dom';
import Dates from './Dates.js'
import "./Calendar.css"

const moment = extendMoment(Moment);
export default class Calendar extends Component {

  userService = new UserService();

  state = {
    dateString: `${moment().format("YYYY")}-${moment().month(moment().format("MMMM")).format("MM")}`,
    notification: "",
    kids: this.props.kids,
    notificationDate: "",
    clickedNameId: "",
    clickedName: "",
    redirect: false,
  }

  createDaysForMonth = () => {
    console.log("Initial:", this.state.dateString)
    const month = moment(this.state.dateString, 'YYYY-MM');
    console.log("Month", month)
    const range = moment().range(moment(month).startOf('month'), moment(month).endOf('month'));
    const days = range.by('days');

    let arrWithDays = ([...days].map(date => date.format('DD-ddd-MM-YYYY')));
    let calendarToRender = this.editArrWithDays(arrWithDays[0], arrWithDays);
    console.log("calendarToRender is:", calendarToRender)
    return calendarToRender.map((date, index) =>
      <div
        key={index} id={date}
        onClick={this.handleClickOnDate}
        style={{ width: 90, height: 90, backgroundColor: "#00A5CB", borderRadius: "4px", color: "#FFF", margin: "2px", cursor: "pointer" }}>{date.substr(0, 6)}
      </div>);
  }

  createOptions = () => {
    let startYear = 2018;
    let endYear = 2020;
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let optionsToRender = [];
    let newArr = [];

    for (let i = startYear; i <= endYear; i++) {
      optionsToRender.push(months.map((month, index) => {
        return <option key={`${month}-${i}`} id={`${month}-${i}`}>{i} {month}</option>
      })) //2D array
    }

    //this loop makes 1D array from 2D array 
    for (var i = 0; i < optionsToRender.length; i++) {
      newArr = newArr.concat(optionsToRender[i]);
    }
    return newArr
  }

  editArrWithDays = (startDay, arrayToEdit) => {
    let startDayArr = startDay.split("-")
    switch (startDayArr[1]) {
      case "Tue":
        arrayToEdit.unshift("")
        break;
      case "Wed":
        arrayToEdit.unshift("", "")
        break;
      case "Thu":
        arrayToEdit.unshift("", "", "")
        break;
      case "Fri":
        arrayToEdit.unshift("", "", "", "")
        break;
      case "Sat":
        arrayToEdit.unshift("", "", "", "", "")
        break;
      case "Sun":
        arrayToEdit.unshift("", "", "", "", "", "")
        break;
      default:
      // do nothing
    }
    return arrayToEdit
  }

  handleLoad = () => {
    document.getElementById(`${moment(this.state.dateString).format('MMMM')}-${moment(this.state.dateString).format('YYYY')}`).selected = true;
  }

  handleSelectEvent = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    let dateString = e.target.value.split(" ");
    console.log(dateString);
    dateString[1] = moment().month(dateString[1]).format("MM")
    console.log(dateString.join("-"))
    this.setState({
      dateString: dateString.join("-")
    })
  }

  handleClickEvent = (e) => {
    e.preventDefault();
    console.log("button event:", e.target.value);
    let futureMonth;
    let futureMonthString
    console.log(moment(this.state.dateString));
    if (e.target.value === "nextMonth") {
      futureMonth = moment(moment(this.state.dateString)).add(1, 'M').calendar().split("/")
    } else {
      futureMonth = moment(moment(this.state.dateString)).subtract(1, 'M').calendar().split("/");
    }
    futureMonthString = [futureMonth[2], futureMonth[0]].join("-")
    console.log("futureMonth is:", futureMonthString);

    this.setState({
      dateString: futureMonthString
    }, () => this.handleLoad())
  }

  handleClickOnDate = (e) => {
    console.log("notification Id is:", e.target.id);
    let notificationDateValue = e.target.id.replace(e.target.id.substring(2, 6), "")
    this.setState({
      notificationDate: notificationDateValue
    }, () => console.log("notification in state:", this.state.notificationDate));

    var offsets = document.getElementById(e.target.id).getBoundingClientRect();
    var top = offsets.top;
    var left = offsets.left;
    console.log("top", top);
    console.log("left", left)
    var popUpForm = document.getElementById('popUpDiv');
    popUpForm.style.display = "block";
    popUpForm.style.position = "absolute";
    popUpForm.style.left = left + 80 + 'px';
    popUpForm.style.top = top - 30 + 'px';
    popUpForm.style.width = "200px";
    popUpForm.style.height = "200px";
    popUpForm.style.backgroundColor = "blue"
  }

  handleNotification = (e) => {
    console.log(e.target.value)
    const { value } = e.target
    e.preventDefault();
    this.setState({
      notification: value
    }, () => console.log("notifikacija", this.state.notification))
  }

  handleCancel = (e) => {
    var popUpForm = document.getElementById('popUpDiv');
    popUpForm.style.display = "none";
  }

  createNotification = () => {
    this.userService.createNotification(this.state.notification, this.state.notificationDate, this.state.clickedNameId)
    .then (()=> this.setState({redirect:true}))
  }

  handleOnClickName = (e) => {
    e.preventDefault();
    let clickedNameId = e.target.getAttribute("id");
    let clickedName = e.target.getAttribute("name");
    this.setState({ clickedNameId, clickedName })
  }

  renderKidsNames = () => {
    return this.props.kids.map((kid, index) => <div className="childName" key={index} onClick={this.handleOnClickName} id={kid._id} name={kid.kidName}>{kid.kidName}</div>)
  }

  componentDidMount() {
    console.log("kids calendar:", this.props.kids)
    this.handleLoad()
  }

  render() {

    if (this.state.redirect === true) {
      window.history.replaceState(null, null, "/"); //it will clean history
      window.location.reload();
      // return <Redirect to='/' />
    }
    
    return (
      <div className="Calendar" style={{ height: "550px", overflow: "scroll", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", minHeight: "5%", width: "60%", margin: "30px auto", justifyContent: "space-around" }} >
          <div style={{ display: "flex", width: "30%", justifyContent: "space-between" }}>
            {this.renderKidsNames()}
          </div>
          <div style={{ width: "50%", display: "flex", justifyContent: "space-around" }}>
            <button style={{ cursor: "pointer", border: "none", width: "60px", borderRadius: "4px", color: "#fff", backgroundColor: "#54008B" }} id="prevMonth" onClick={this.handleClickEvent} value="prevMonth">Prev</button>
            <select style={{ border: "none", borderRadius: "4px", backgroundColor: "#FFE200" }} onChange={this.handleSelectEvent}>
              {this.createOptions()}
            </select>
            <button style={{ cursor: "pointer", border: "none", width: "60px", borderRadius: "4px", color: "#fff", backgroundColor: "#54008B" }} id="nextMonth" onClick={this.handleClickEvent} value="nextMonth">Next</button>
          </div>
        </div>
        <Route path="/" render={(props) => <Dates {...props} createDaysForMonth={this.createDaysForMonth} />} />
        <div id="popUpDiv" style={{ display: "none" }}>
          <form onSubmit={this.createNotification}>
            <p>Date: {this.state.notificationDate}</p>
            <p>Notification for kid: {this.props.kids.length !== 0 ? this.state.clickedName : null}</p>
            <label>Note:</label>
            <textarea name="notification" onChange={this.handleNotification} />
            <input type="submit" value="send"></input>
            <div id="cancel" onClick={this.handleCancel} style={{ cursor: "pointer" }} >x</div>
          </form>
        </div>
      </div>
    )
  }
}
