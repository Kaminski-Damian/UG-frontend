const db = require('../database');

module.exports = class Driver {
  constructor(name, yearOfBirth) {
    this.name = name,
    this.yearOfBirth = yearOfBirth
  }

  save() {
    return db.execute(
      'INSERT INTO drivers (name, yearOfBirth) VALUES (?, ?)',
      [this.name, this.yearOfBirth]
    )
  }

  static get() {
    return db.execute('SELECT * FROM drivers');
  }
}