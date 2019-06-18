import React, { Component } from 'react'
import UserService from '../../user/UserService';
import AuthService from '../../auth/AuthService';
import NavBar from "./NavBar";
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import MenuCard from './MenuCard'
import "./Main.css"
import TimeLineMessageUser from './TimeLineMessageUser';
import Calendar from './Calendar'
// import Moment from 'moment';
// import { extendMoment } from 'moment-range';

//const moment = extendMoment(Moment);
export default class Main extends Component {

  state = {
    timeLineMessages: [],
    kids: [],
    //dateString: `${moment().format("YYYY")}-${moment().month(moment().format("MMMM")).format("MM")}`,
  }

  // updateStateInMain = (index) => {
  //   this.setState({
  //     timeLineCardOrder: index
  //   })
  // }

  authService = new AuthService();
  userService = new UserService();

  logOut = () => {
    this.authService.logout()
      .then(response => {
        console.log("LogOut returns:", response);
        this.props.updateStateInGS(null, false);
      })
  }

  componentDidMount() {
    console.log("I am in Main did mount")
    console.log("User is:", this.props.state.user)

    // this.userService.parentKids(this.props.state.user._id)
    //     .then((result) => {
    //       console.log("kids", result);
    //       this.setState({
    //         kids: result
    //       })
    //     })
    this.userService.messages(this.props.state.user._id)
      .then((result) => {
        console.log("From service hope", result);
        this.setState({
          timeLineMessages: result
        })
      })
      .then(() => this.userService.parentKids(this.props.state.user._id)
        .then((result) => {
          console.log("kids", result);
          this.setState({
            kids: result.kidsID
          })
        }))

  }

  render() {
    return (
      <div>
        <NavBar state={this.props.state} logOut={this.logOut} />
        <Header />
        <div className="Main">
          <div className="menuCards">
            <MenuCard imgURL="https://banner2.kisspng.com/20180730/cpx/kisspng-computer-icons-clip-art-bell-icon-free-download-5b5eb2ea181e35.1726661415329328420988.jpg" linkText="/" />
            <MenuCard imgURL="https://banner2.kisspng.com/20180730/cpx/kisspng-computer-icons-clip-art-bell-icon-free-download-5b5eb2ea181e35.1726661415329328420988.jpg" linkText="/test" />
          </div>
          <div className="centralWindow">
            <Switch>
              <Route exact path='/test' render={(props) => <Calendar {...props} kids={this.state.kids} />} />
              <Route
                path="/"
                render={this.state.timeLineMessages.length !== 0 ? (props) => <TimeLineMessageUser {...props} timeLineMessages={this.state.timeLineMessages} /> : null} />
            </Switch>
          </div>
          <div className="news">
            <Switch>
              {/* <Route exact path="/news" component={News}></Route>
              <Route exact path="/news" component={Content}></Route> */}
            </Switch>
          </div>
        </div>
        <Switch>

        </Switch>

      </div>
    )
  }
}