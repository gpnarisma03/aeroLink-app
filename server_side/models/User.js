const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  bookingHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking' // Assuming you have a Booking model
  }],
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update 'updatedOn' field
userSchema.pre('save', function (next) {
  this.updatedOn = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
