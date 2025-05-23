const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

module.exports.addBooking = async (req, res) => {
  const {
    flightId,
    flightType,
    seatNumber,
    totalAmount
  } = req.body;

  const userId = req.user.id;        // From auth middlewarereq.user._id
  const userRole = req.user.role;     // Ensure your token includes 'role'

  // Only users can book, not admins
  if (userRole !== 'user') {
    return res.status(403).json({
      success: false,
      message: 'Only users are allowed to make bookings'
    });
  }

  // Validation
  if (!flightId || !flightType || !seatNumber || totalAmount == null) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (!['one-way', 'round-trip'].includes(flightType)) {
    return res.status(400).json({ success: false, message: 'Invalid flight type' });
  }

  if (isNaN(totalAmount) || totalAmount < 0) {
    return res.status(400).json({ success: false, message: 'Invalid total amount' });
  }

  try {
    // Check if flight exists
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }

    // Check seat availability
    if (flight.seatsAvailable <= 0) {
      return res.status(400).json({ success: false, message: 'No seats available on this flight' });
    }

    // Create booking
    const newBooking = new Booking({
      userId,
      flightId,
      flightType,
      seatNumber,
      totalAmount
    });

    const savedBooking = await newBooking.save();

    // Decrease seat count
    flight.seatsAvailable -= 1;
    await flight.save();

    return res.status(201).json({
      success: true,
      message: 'Booking successful',
      booking: savedBooking
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};





// Get all bookings (with user and flight info)
module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'firstName lastName email mobileNumber')
      .populate('flightId', 'fromLocation toLocation departureDate arrivalDate');

    return res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get booking by ID
module.exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id)
      .populate('userId', 'firstName lastName email mobileNumber')
      .populate('flightId', 'fromLocation toLocation departureDate arrivalDate');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};



module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Ensure user can only cancel their own booking (unless you're building admin logic too)
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    // Increase seat count back
    const flight = await Flight.findById(booking.flightId);
    if (flight) {
      flight.seatsAvailable += 1;
      await flight.save();
    }

    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Booking canceled successfully'
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



//get booking for logged in user
module.exports.getMyBookings = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookings = await Booking.find({ userId })
      .populate('flightId', 'fromLocation toLocation departureDate arrivalDate');

    return res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
