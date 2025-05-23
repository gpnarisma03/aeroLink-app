const express = require('express');
const flightController = require('../controllers/flightController');
const { verify, verifyAdmin } = require('../auth');

const router = express.Router();

// Add a flight
router.post('/', verify, verifyAdmin, flightController.addFlight);

// Update a flight by its _id
router.put('/:id', verify, verifyAdmin, flightController.updateFlight);

// Delete a flight by its _id
router.delete('/:id', verify, verifyAdmin, flightController.deleteFlight);

router.get('/', flightController.getAllFlights);


module.exports = router;
