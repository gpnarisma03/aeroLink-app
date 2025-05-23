// models/Passenger.js
const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  class: { type: String, enum: ['economy', 'business', 'first'] },
  fare: Number,
  baggageDetails: String,
  otherDetails: String
});

module.exports = mongoose.model('Passenger', passengerSchema);
