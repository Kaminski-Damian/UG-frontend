function Driver(name, yearOfBirth) {
  if (!(this instanceof Driver)) {
    return new Driver(name, yearOfBirth);
  }

  this.name = name;
  this.yearOfBirth = yearOfBirth;
}

function Truck (reg, km, driver) {
  if (this instanceof Truck) {
    return console.log('Abstract Class!');
  }

  this.id = null;
  this.colors = null;
  this.regNumber = reg;
  this.routeInKilometers = km;
  this.driver = driver;
}

Truck.prototype.setColors = function(col1, col2) {
  this.colors = [col1, col2];
}

function NationalTruck(reg, km, driver) {
  if (!(this instanceof NationalTruck)) {
    return new NationalTruck();
  }
  Truck.call(this, reg, km, driver);
  this.internationalFreight = false;
}

function InternationalTruck(reg, km, driver) {
  if (!(this instanceof InternationalTruck)) {
    return new InternationalTruck();
  }
  Truck.call(this, reg, km, driver);
  this.internationalFreight = true;
}

NationalTruck.prototype = Object.create(Truck.prototype);
NationalTruck.prototype.constructor = NationalTruck;

InternationalTruck.prototype = Object.create(Truck.prototype);
InternationalTruck.prototype.constructor = InternationalTruck;

var app = (function() {
  var database = {
    records: [],
    currentId: 0
  };

  return {
    ///////////////////////////////////////////////////////
    addNewTruck: function (newTruck) {
      var alreadyExistingTruck;
      if (!!database.records.length) {
        alreadyExistingTruck = database.records
          .find(function(truck) {
            return truck.regNumber === newTruck.regNumber;
          });
      }
      if (!!alreadyExistingTruck) {
        var response = this.prepareResponse('Truck already exist in database', null);
        return response;
      }
      newTruck.id = ++database.currentId;
      database.records.push(newTruck);
    
      var response = this.prepareResponse('OK', null);
      return response;
    },
    ///////////////////////////////////////////////////////
    getAllTrucks: function () {
      var response = this.prepareResponse('OK', database.records);
      return response;
    },
    ///////////////////////////////////////////////////////
    findTruckById: function (id) {
      var searchedTruck = database.records
        .find(function(truck) {
          return truck.id === id;
        });
      var msg = !!searchedTruck ? 'OK' : 'Upsss!';
      var response = this.prepareResponse(msg, searchedTruck); 
      return response;
    },
    ///////////////////////////////////////////////////////
    findByRegNumber: function (regNumber) {
      var filterTruck = database.records
        .filter(function(truck) {
          return truck.regNumber === regNumber;
        });
      var msg = !!filterTruck.length ? 'OK' : 'Upsss!';
      var response = this.prepareResponse(msg, filterTruck); 
      return response;
    },
    ///////////////////////////////////////////////////////
    findByDriverName: function (name) {
      var filterTruck = database.records
        .filter(function(truck) {
          return truck.driver.name === name;
        });
      var msg = !!filterTruck.length ? 'OK' : 'Upsss!';
      var response = this.prepareResponse(msg, filterTruck);
      return response;
    },
    ///////////////////////////////////////////////////////
    updateTruck: function (id, params) {
      var record = JSON.parse(this.findTruckById(id));
      if (record.msg !== 'OK') {
        var response = this.prepareResponse(record.msg, null);
        return response;
      } 
      for (var param in params) {
        if(params.hasOwnProperty(param)) {
          if (param === 'id') { 
            var response = this.prepareResponse('Upsss!', null);
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
      var response = this.prepareResponse('OK', null);
      return response;
    },
    ///////////////////////////////////////////////////////
    deleteTruck: function (id) {
      var databaseBeforeDeleting = database.records.length;
      database.records = database.records
        .filter(function(truck) {
          return truck.id !== id;
        });
      var msg = databaseBeforeDeleting > database.records.length
        ? 'OK'
        : 'Upsss!';
      var response = this.prepareResponse(msg, null);
      return response;
    },
    ///////////////////////////////////////////////////////
    prepareResponse: function (msg, data) {
      var response = {
        msg: msg,
        data: data
      };
      return JSON.stringify(response);
    }
  };
})();

var driver1 = new Driver('Borys', 1410);
var truck1 = new NationalTruck('GDA1234', 300, driver1);
truck1.setColors('pink', 'blue');

app.addNewTruck(truck1);

var driver2 = new Driver('Karol', 1987);
var truck2 = new InternationalTruck('NBA1234', 300, driver2);
truck2.setColors('red', 'black');

app.addNewTruck(truck2);

console.log(JSON.parse(app.findTruckById(1)));
