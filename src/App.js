import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Countdown from './component/Countdown';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Countdown/>
      </div>
    );
  }
}

export default App;
