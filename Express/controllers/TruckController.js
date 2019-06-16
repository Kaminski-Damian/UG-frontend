const Truck = require('../models/truck');

exports.getTrucks = (req, res, next) => {
  const trucks = Truck.get();
  trucks
    .then(([result, fieldData]) => res.send(result))
    .catch(err => console.error(err));
};

exports.postTruck = (req, res, next) => {
  const { regNumber, routeInKilometers, internationalFreight, driverId } = req.body
  const truck = new Truck(regNumber, routeInKilometers, internationalFreight, driverId);
  truck.save()
    .then(() => res.send('OK'))
    .catch(err => console.error(err));
}

exports.deleteTruck = (req, res, next) => {
  Truck.delete(req.body.id)
    .then(() => res.send('OK'))
    .catch(err => console.error(err));
}