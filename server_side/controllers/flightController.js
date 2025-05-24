const mongoose = require("mongoose");
const Flight = require("../models/Flight");
const Airline = require("../models/Airline");

module.exports.addFlight = async (req, res) => {
  const {
    airline, // Use 'airline' (ObjectId) instead of 'airlineId'
    fromLocation,
    toLocation,
    departureDate,
    arrivalDate,
    seatsAvailable,
  } = req.body;

  // Basic validation
  if (
    !airline ||
    !fromLocation ||
    !toLocation ||
    !departureDate ||
    !arrivalDate ||
    seatsAvailable == null
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (fromLocation.toLowerCase() === toLocation.toLowerCase()) {
    return res
      .status(400)
      .json({
        success: false,
        message: "From and To locations must be different",
      });
  }

  if (isNaN(Date.parse(departureDate)) || isNaN(Date.parse(arrivalDate))) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid date format" });
  }

  if (new Date(departureDate) >= new Date(arrivalDate)) {
    return res
      .status(400)
      .json({ success: false, message: "Departure must be before arrival" });
  }

  if (seatsAvailable < 0) {
    return res
      .status(400)
      .json({ success: false, message: "Seats must be 0 or more" });
  }

  try {
    // Find airline by _id (not airlineId)
    const airlineDoc = await Airline.findById(airline);

    if (!airlineDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Airline not found" });
    }

    const newFlight = new Flight({
      airline: airlineDoc._id,
      fromLocation,
      toLocation,
      departureDate,
      arrivalDate,
      seatsAvailable,
    });

    const savedFlight = await newFlight.save();

    return res.status(201).json({
      success: true,
      message: "Flight added successfully",
      flight: savedFlight,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.updateFlight = async (req, res) => {
  const { id } = req.params; // flight _id
  const {
    airline,
    fromLocation,
    toLocation,
    departureDate,
    arrivalDate,
    seatsAvailable,
  } = req.body;

  // Basic validation
  if (
    !airline ||
    !fromLocation ||
    !toLocation ||
    !departureDate ||
    !arrivalDate ||
    seatsAvailable == null
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (fromLocation.toLowerCase() === toLocation.toLowerCase()) {
    return res
      .status(400)
      .json({
        success: false,
        message: "From and To locations must be different",
      });
  }

  if (isNaN(Date.parse(departureDate)) || isNaN(Date.parse(arrivalDate))) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid date format" });
  }

  if (new Date(departureDate) >= new Date(arrivalDate)) {
    return res
      .status(400)
      .json({ success: false, message: "Departure must be before arrival" });
  }

  if (seatsAvailable < 0) {
    return res
      .status(400)
      .json({ success: false, message: "Seats must be 0 or more" });
  }

  try {
    // Check if flight exists
    const flight = await Flight.findById(id);
    if (!flight) {
      return res
        .status(404)
        .json({ success: false, message: "Flight not found" });
    }

    // Validate airline exists
    const airlineDoc = await Airline.findById(airline);
    if (!airlineDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Airline not found" });
    }

    // Update fields
    flight.airline = airlineDoc._id;
    flight.fromLocation = fromLocation;
    flight.toLocation = toLocation;
    flight.departureDate = departureDate;
    flight.arrivalDate = arrivalDate;
    flight.seatsAvailable = seatsAvailable;
    flight.updatedOn = new Date();

    const updatedFlight = await flight.save();

    return res.status(200).json({
      success: true,
      message: "Flight updated successfully",
      flight: updatedFlight,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.deleteFlight = async (req, res) => {
  const { id } = req.params; // flight _id

  try {
    const flight = await Flight.findById(id);

    if (!flight) {
      return res
        .status(404)
        .json({ success: false, message: "Flight not found" });
    }

    await flight.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Flight deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate("airline"); // populate to get airline details

    return res.status(200).json({
      success: true,
      message: "Flights retrieved successfully",
      flights,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
