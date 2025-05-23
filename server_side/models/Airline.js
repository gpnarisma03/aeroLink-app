const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Airline', airlineSchema);
