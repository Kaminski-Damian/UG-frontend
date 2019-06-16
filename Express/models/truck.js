const db = require('../database');

module.exports = class Truck {
  constructor(regNumber, routeInKilometers, internationalFreight, driverId) {
    this.regNumber = regNumber,
    this.routeInKilometers = routeInKilometers,
    this.internationalFreight = internationalFreight,
    this.driverId = driverId
  }

  save() {
    return db.execute(
      'INSERT INTO trucks (regNumber, routeInKilometers, internationalFreight, driverId) VALUES (?, ?, ?, ?)',
      [this.regNumber, this.routeInKilometers, this.internationalFreight, this.driverId]
    );
  }

  static delete(id) {
    return db.execute(
      'DELETE FROM trucks WHERE id=?',
      [id]
    );
  }

  static get() {
    return db.execute('SELECT * FROM trucks');
  }
}