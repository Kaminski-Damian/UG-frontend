import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import AddDriver from './components/AddDriver';
import AddTruck from './components/AddTruck';
import Trucks from './components/Trucks';

class App extends Component {
  state = {
    trucks: [],
    drivers: [],
    frachts: []
  }

  componentDidMount() {
    this.getDrivers();
    this.getTrucks();
  }

  updateFracht() {
    this.state.trucks.forEach((truck, index) => {
      const driver = this.state.drivers
        .find(driver => driver.id === truck.driverId);
      if (!!driver) {
        this.setState({
          frachts: [ ...this.state.frachts, { ...truck, driver } ]
        });
      }
    });
    this.updatedTrucks();
  }

  updatedTrucks() {
    this.setState({
      trucks: []
    });
  }

  getDrivers() {
    axios.get('http://localhost:4000/api/drivers')
      .then(res => res.data)
      .then(drivers => {
        this.setState({
          drivers: [ ...this.state.drivers, ...drivers ]
        });
      })
      .catch(err => console.error(err));
  }

  getTrucks() {
    axios.get('http://localhost:4000/api/trucks')
      .then(res => res.data)
      .then(trucks => {
        this.setState({
          trucks: [ ...this.state.trucks, ...trucks ]
        });
        this.updateFracht();
      })
      .catch(err => console.error(err));
  }

  addDriver = (newDriver) => {
    axios.post('http://localhost:4000/api/drivers', newDriver)
      .then(() => {
        this.setState({
          drivers: [ ...this.state.drivers, newDriver ]
        });
        this.updateFracht();
      })
      .catch(err => console.error(err))
  }

  addTruck = (newTruck) => {
    newTruck = { ...newTruck, driverId: newTruck.driver.id };
    delete newTruck.driver;
    axios.post('http://localhost:4000/api/trucks', newTruck)
      .then(() => {
        this.setState({
          trucks: [ ...this.state.trucks, newTruck ]
        });
        this.updateFracht();
      })
      .catch(err => console.error(err));
  }

  deleteTruck = (id) => {
    axios.delete('http://localhost:4000/api/trucks', {
      data: { id }
    })
      .then(() => {
        const updatedFrachts = this.state.frachts
          .filter(truck => truck.id !== id );
        this.setState({
          frachts: updatedFrachts
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="app">
        <AddDriver addDriver={ this.addDriver } />
        <AddTruck addTruck={ this.addTruck } drivers={ this.state.drivers } />
        <hr />
        <Trucks trucks={ this.state.frachts } deleteTruck={ this.deleteTruck } />
      </div>
    );
  }
}

export default App;
