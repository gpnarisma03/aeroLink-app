// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  bookingDate: { type: Date, default: Date.now },
  flightType: { type: String, enum: ['one-way', 'round-trip'], required: true },
  seatNumber: String,
  totalAmount: Number,
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
