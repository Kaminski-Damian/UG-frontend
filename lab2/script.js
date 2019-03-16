var database = {
  records: [],
  currentId: 0
};

var firstTruck = {
  id: null,
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
  id: null,
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
  id: null,
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
  id: null,
  colors: ['white', 'blue'],
  regNumber: 'NBA9900',
  routeInKilometers: 400,
  internationalFreight: false,
  driver: {
    name: 'Rafał',
    age: 28
  }
};

function addNewTruck(newTruck) {
  var alreadyExistingTruck;
  if (!!database.records.length) {
    alreadyExistingTruck = database.records
      .find(function(truck) {
        return truck.regNumber === newTruck.regNumber;
      });
  }
  if (!!alreadyExistingTruck) {
    var response = prepareResponse('Truck already exist in database', null);
    return response;
  }
  newTruck.id = ++database.currentId;
  database.records.push(newTruck);

  var response = prepareResponse('OK', null);
  return response;
}

function getAllTrucks() {
  var response = prepareResponse('OK', database.records);
  return response;
}

function findTruckById(id) {
  var searchedTruck = database.records.find(function(truck) {
      return truck.id === id;
    });
  var msg = !!searchedTruck ? 'OK' : 'Upsss!';
  var response = prepareResponse(msg, searchedTruck); 
  return response;
}

function findByRegNumber(regNumber) {
  var filterTruck = database.records
    .filter(function(truck) {
      return truck.regNumber === regNumber;
    });
  var msg = !!filterTruck.length ? 'OK' : 'Upsss!';
  var response = prepareResponse(msg, filterTruck); 
  return response;
}

function findByDriverName(name) {
  var filterTruck = database.records
    .filter(function(truck) {
      return truck.driver.name === name;
    });
  var msg = !!filterTruck.length ? 'OK' : 'Upsss!';
  var response = prepareResponse(msg, filterTruck);
  return response;
}

function updateTruck(id, params) {
  var record = JSON.parse(findTruckById(id));
  if (record.msg !== 'OK') {
    var response = prepareResponse(record.msg, null);
    return response;
  } 
  for (var param in params) {
    if(params.hasOwnProperty(param)) {
      if (param === 'id') { 
        var response = prepareResponse('Upsss!', null);
        return response;
      }
      record.data[param] = params[param];
    }
  };
  database.records = database.records
    .map(function(truck) {
      if (truck.id === record.data.id) {
        truck = record.data;
      }
      return truck;
    });
  var response = prepareResponse('OK', null);
  return response;
}

function deleteTruck(id) {
  var databaseBeforeDeleting = database.records.length;
  database.records = database.records.filter(function(truck) {
    return truck.id !== id;
  });
  var msg = databaseBeforeDeleting > database.records.length
    ? 'OK'
    : 'Upsss!';
  var response = prepareResponse(msg, null);
  return response;
}

function prepareResponse(msg, data) {
  var response = {
    msg: msg,
    data: data
  };
  return JSON.stringify(response);
}
