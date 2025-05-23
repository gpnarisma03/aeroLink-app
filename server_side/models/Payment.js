// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: Number,
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['credit_card', 'gcash', 'paypal'] },
  status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
