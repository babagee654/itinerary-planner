const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');

// Add user
router.post('/user', databaseController.addUser);

// Get single user by username
router.post('/user/:username', databaseController.getUser);
module.exports = router;

// Add trip
router.post('/trip', databaseController.addTrip);
// Get single trip
router.get('/trip/:id', databaseController.getTrip);
router.get('/trip', databaseController.getTrips);

// Add packing list
router.post('/packingList', databaseController.addPackingList);
// Get single packing list
// router.get('/packingList/:id', databaseController.getPackingList);
// router.get('/packingList', databaseController.getPackingLists);

// Add country tip
router.post('/countryTip', databaseController.addCountryTip);
// Get single country tip
// router.get('/countryTip/:id', databaseController.getCountryTip);
// router.get('/countryTip', databaseController.getCountryTips);