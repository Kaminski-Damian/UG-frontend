import React, { Component } from 'react';
import './App.css';

import AddDriver from './components/AddDriver';
import AddTruck from './components/AddTruck';
import Trucks from './components/Trucks';

class App extends Component {
  state = {
    trucks: [],
    drivers: [
      { id: 1, name: 'Janusz', yearOfBirth: 1410 },
      { id: 2, name: 'Marian', yearOfBirth: 1999 },
    ]
  }

  addDriver = (newDriver) => {
    newDriver.id = Math.random();
    this.setState({
      drivers: [ ...this.state.drivers, newDriver ]
    });
  }

  addTruck = (newTruck) => {
    newTruck.id = Math.random();
    this.setState({
      trucks: [ ...this.state.trucks, newTruck ]
    });
  }

  render() {
    return (
      <div className="app">
        <AddDriver addDriver={ this.addDriver } />
        <AddTruck addTruck={ this.addTruck } drivers={ this.state.drivers } />
        <hr />
        <Trucks trucks={ this.state.trucks } />
      </div>
    );
  }
}

export default App;
