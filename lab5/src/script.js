class Driver {
  constructor (name, yearOfBirth) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
  }
}

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

class NationalTruck extends Truck {
  constructor (reg, km, driver) {
    super(reg, km, driver);
    this.internationalFreight = false;
  }
}

class InternationalTruck extends Truck {
  constructor (reg, km, driver) {
    super(reg, km, driver);
    this.internationalFreight = true;
  }
}

class App {
  constructor () {
    this.database = {
      records: [],
      currentId: 0
    }
    this.response = null
  };
}