class Truck {
  constructor (reg, km, driver) {
    if (this.constructor === Truck) {
      throw new Error('Abstract Class!');
    }
    this.id = null;
    this.colors = null;
    this.regNumber = reg;
    this.routeInKilometers = km;
    this.driver = driver;
  }

  setColors(col1, col2) {
    this.colors = [col1, col2];
  }
}

export default Truck;