function Driver(name, yearOfBirth) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
}

function Truck (reg, km, driver) {
  this.id = null;
  this.colors = null;
  this.regNumber = reg;
  this.routeInKilometers = km;
  this.driver = driver;
}

Truck.prototype.getId = function() {
  return this.id;
}

Truck.prototype.setColors = function(col1, col2) {
  this.colors = [col1, col2];
}

function NationalTruck() {
  this.internationalFreight = false;
}

function International() {
  this.internationalFreight = true;
}

// NationalTruck.prototype = Object.create(Truck.prototype);
// NationalTruck.prototype.constructor = NationalTruck;

// International.prototype = Object.create(Truck.prototype);
// International.prototype.constructor = International;

var driver = new Driver('Borys', 1410);
var truck = new Truck('GDA1234', 300, driver);
truck.setColors('pink', 'blue');

console.log(truck);
