import React from 'react';
import { Redirect, Route } from 'react-router-dom';


// componentDidUpdate = (prevState, prevProps) => {
//     // Typical usage (don't forget to compare props):

//       // Typical usage (don't forget to compare props):
//       if (this.props.authed !== prevProps.authed) {
//         this.setState({
//           username: this.props.currentUser
//         });

//     }
//   }
const PrivateRoute = ({ component: Component, authed, updateStateInApp, state, ...rest }) => {
  console.log(authed);

  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} updateStateInApp={updateStateInApp} state={state} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;