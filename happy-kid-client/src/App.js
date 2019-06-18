import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import './auth/AuthService'
import GlobalErrorSwitch from './components/GlobalErrorSwitch/GlobalErrorSwitch'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Route component={GlobalErrorSwitch} />
      </div>
    )
  }
}

export default App;
