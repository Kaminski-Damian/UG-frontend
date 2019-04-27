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

  addNewTruck (newTruck) {
    let alreadyExistingTruck;
    if (!!this.database.records.length) {
      alreadyExistingTruck = this.database.records
        .find(truck => truck.regNumber === newTruck.regNumber);
    }
    if (!!alreadyExistingTruck) {
      return this.sendResponse('Truck already exist in database', null);
    }
    newTruck.id = ++this.database.currentId;
    this.database.records.push(newTruck);
  
    return this.sendResponse('OK', null);
  }

  getAllTrucks() {
    return this.sendResponse('OK', this.database.records);
  }

  findTruckById(id) {
    const searchedTruck = this.database.records
      .find(truck => truck.id === id);
    const msg = !!searchedTruck ? 'OK' : 'Upsss!';
    return this.sendResponse(msg, searchedTruck);
  }

  updateTruck(id, params) {
    const record = JSON.parse(this.findTruckById(id));
    if (record.msg !== 'OK') {
      return this.sendResponse(record.msg, null);
    } 
    for (const param in params) {
      if(params.hasOwnProperty(param)) {
        if (param === 'id') {
          return this.sendResponse('Upsss!', null); 
        }
        record.data[param] = params[param];
      }
    };
    this.database.records = this.database.records
      .map(truck => {
        if (truck.id === record.data.id) {
          truck = record.data;
        }
        return truck;
      });
    return this.sendResponse('OK', null);
  }

  deleteTruck(id) {
    const deletedTruckIndex = this.database.records
      .findIndex(truck => truck.id === id);
    if (deletedTruckIndex < 0) {
      return this.sendResponse('Upsss!', null); 
    }
    this.database.records.splice(deletedTruckIndex, 1);
    return this.sendResponse('OK', null); 
  }

  prepareResponse(msg, data) {
    this.response = { msg, data };
    return JSON.stringify(response);
  }

  sendResponse(msg, data) {
    this.response = this.prepareResponse(msg, data);
    return this.response;
  }
}
