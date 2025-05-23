const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline', required: true },
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flight', flightSchema);
