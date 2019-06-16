const express = require('express');
const router = express.Router();

const DriverController =  require('../controllers/DriverController');
const TruckController =  require('../controllers/TruckController');

router.get('/drivers', DriverController.getDrivers);
router.post('/drivers', DriverController.postDriver);

router.get('/trucks', TruckController.getTrucks);
router.post('/trucks', TruckController.postTruck);

module.exports = router;