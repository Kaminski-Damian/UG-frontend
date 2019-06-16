const Driver = require('../models/driver');

exports.getDrivers = (req, res, next) => {
  const drivers = Driver.get();
  drivers
    .then(([result, fieldData]) => res.send(result))
    .catch(err => console.error(err));
};

exports.postDriver = (req, res, next) => {
  const { name, yearOfBirth } = req.body
  const driver = new Driver(name, yearOfBirth);
  driver.save()
    .then(() => res.send('OK'))
    .catch(err => console.error(err));
}