import React, { Component } from 'react';

import Driver from '../models/driver';

class AddDriver extends Component {
  state = {
    name: null,
    yearOfBirth: null,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, yearOfBirth } = this.state
    const newDriver = new Driver(name, yearOfBirth);
    this.props.addDriver(newDriver);
  }

  render() {
    return (
      <div>
        <h2>Add Driver</h2>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="name">Driver Name </label>
          <input type="text" id="name" onChange={ this.handleChange }/><br />
          <label htmlFor="yearOfBirth">Driver Year Of Birth </label>
          <input type="text" id="yearOfBirth" onChange={ this.handleChange }/><br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddDriver