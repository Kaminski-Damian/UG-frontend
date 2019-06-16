class Truck {
  constructor (reg, km, driver) {
    if (this.constructor === Truck) {
      throw new Error('Abstract Class!');
    }
    this.id = null;
    this.regNumber = reg;
    this.routeInKilometers = km;
    this.driver = driver;
  }
}

export default Truck;