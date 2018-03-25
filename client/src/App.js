import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListContainer from './components/ListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Caradisiac</h1>
        </header>
        <p className="App-intro">
          List of cars available on caradisiac, sorted by volume
        </p>
        <div className="container">
          <ListContainer />
        </div>
      </div>
    );
  }
}

export default App;
