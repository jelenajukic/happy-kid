
// isAuthenticated = () => this.service.currentUser()
//   .then(response => {
//     console.log("is authenticated:", response)
//     if (response.status === 403) {
//       this.setState({
//         isAuthenticated: false
//       })
//     } else {
//       this.setState({
//         isAuthenticated: true
//       })
//     }
//   })


{/* <PrivateRoute authed={this.state.isAuthenticated} path='/' component={Main} state={this.state} updateStateInApp={this.updateStateInApp} exact /> */ }
{/* <Route exact path='/' render={(props) => <Main {...props} state={this.state} updateStateInApp={this.updateStateInApp} />} /> */ }
{/* <Route exact path='/login' render={(props) => <LogIn {...props} updateStateInApp={this.updateStateInApp} />} />
          <Route exact path='/signup' render={(props) => <SignUp {...props} />} /> */}
{/* <Route exact path="/test" component={Test}></Route>
          <Route exact path="/content" component={Content}></Route> */}
{/* </Switch> */ }


componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.currentUser !== prevProps.currentUser) {
    this.setState({
      username: this.props.currentUser
    });
  }
}


import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';

import AuthService from './auth/AuthService';
import Main from './components/Main/Main';