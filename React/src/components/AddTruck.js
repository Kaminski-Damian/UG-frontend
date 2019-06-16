import React, { Component } from 'react';

import NationalTruck from '../models/nationalTruck';
import InternationalTruck from '../models/internationalTruck';

class AddTruck extends Component {
  state = {
    regNumber: null,
    routeInKilometers: null,
    internationalFreight: null,
    driver: {
      id: null,
      name: null,
      yearOfBirth: null
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? 
      target.checked : 
      target.value;
    const name = target.id;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { regNumber, routeInKilometers, driver } = this.state;
    driver = this.findDriver(driver);
    let newTruck;
    if (!!this.state.internationalFreight) {
      newTruck = new InternationalTruck(regNumber, routeInKilometers, driver);
    } else {
      newTruck = new NationalTruck(regNumber, routeInKilometers, driver);
    }
    this.props.addTruck(newTruck);
  }

  findDriver(id) {
    const driver = this.props.drivers
      .find(driver => driver.id === Number(id));
    return driver;
  }

  render() {
    const driverOption = this.props.drivers.map(driver => {
      return (
        <option value={ driver.id } key={ driver.id }>Name: { driver.name }, Year Of Birth: { driver.yearOfBirth }</option>
      )
    })

    return (
      <div>
        <h2>Add Truck</h2>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="regNumber">Registration Number </label>
          <input type="text" id="regNumber" onChange={ this.handleChange }/><br />
          <label htmlFor="routeInKilometers">Route In Kilometers </label>
          <input type="text" id="routeInKilometers" onChange={ this.handleChange }/><br />
          <label htmlFor="internationalFreight">International Freight </label>
          <input type="checkbox" id="internationalFreight" onChange={ this.handleChange } /><br />
          <label htmlFor="driver">Driver </label>
          <select id="driver" onChange={ this.handleChange }>
            { driverOption }
          </select><br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddTruck