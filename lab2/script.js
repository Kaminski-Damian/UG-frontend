var database = [];

var firstTruck = {
  colors: ['pink', 'yellow'],
  regNumber: 'GDA1243',
  routeInKilometers: 1000,
  internationalFreight: true,
  driver: {
    name: 'Paweł',
    age: 45
  }
};

var secondTruck = {
  colors: ['red', 'gray'],
  regNumber: 'WWA7574',
  routeInKilometers: 300,
  internationalFreight: false,
  driver: {
    name: 'Janusz',
    age: 70
  }
};

var thirdTruck = {
  colors: ['black', 'green'],
  regNumber: 'NWA8383',
  routeInKilometers: 700,
  internationalFreight: true,
  driver: {
    name: 'Maryla',
    age: 39
  }
};

var fourthTruck = {
  colors: ['white', 'blue'],
  regNumber: 'NBA9900',
  routeInKilometers: 400,
  internationalFreight: false,
  driver: {
    name: 'Rafał',
    age: 28
  }
};

function addToDatabase(truck) {
  database.push(truck);
}

function readAllFromDatabase() {
  database.forEach(function (truck) {
    console.log(truck);
  });
}

function findByRegNumber (regNumber) {
  var filterTruck = database.filter(function(truck) {
    return truck.regNumber === regNumber;
  });
  console.log(filterTruck);
}

function findByDriverName (name) {
  var filterTruck = database.filter(function(truck) {
    return truck.driver.name === name;
  });
  console.log(filterTruck);
}

addToDatabase(firstTruck);
addToDatabase(secondTruck);
// readAllFromDatabase();
// findByRegNumber('GDA1243');
findByDriverName('Maryla');
addToDatabase(thirdTruck);
findByDriverName('Maryla');
