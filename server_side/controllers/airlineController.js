const mongoose = require("mongoose");
const Airline = require("../models/Airline");

module.exports.addAirline = async (req, res) => {
  const { name, logo, email, mobileNo, address } = req.body;

  // Basic field validation
  if (!name || !email || !mobileNo || !address) {
    return res
      .status(400)
      .json({ success: false, message: "All required fields must be filled" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  // Mobile number validation: Must be 11 digits
  if (!/^\d{11}$/.test(mobileNo)) {
    return res.status(400).json({
      success: false,
      message: "Mobile number must be exactly 11 digits",
    });
  }

  try {
    // Check for duplicate name, email, or mobileNo
    const existingAirline = await Airline.findOne({
      $or: [
        { name: { $regex: `^${name}$`, $options: "i" } }, // case-insensitive match
        { email },
        { mobileNo },
      ],
    });

    if (existingAirline) {
      if (existingAirline.name.toLowerCase() === name.toLowerCase()) {
        return res
          .status(409)
          .json({ success: false, message: "Airline name already exists" });
      }
      if (existingAirline.email === email) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
      if (existingAirline.mobileNo === mobileNo) {
        return res
          .status(409)
          .json({ success: false, message: "Mobile number already in use" });
      }
    }

    // Create new airline
    const newAirline = new Airline({
      airlineId: `AIR-${Date.now()}`, // or use UUID if preferred
      name,
      logo: logo || null,
      email,
      mobileNo,
      address,
    });

    const savedAirline = await newAirline.save();

    return res.status(201).json({
      success: true,
      message: "Airline added successfully",
      airlineDetails: savedAirline,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getAirlineDetails = async (req, res) => {
  const { airlineId } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(airlineId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid airline ID format" });
  }

  try {
    const airline = await Airline.findById(airlineId);

    if (!airline) {
      return res
        .status(404)
        .json({ success: false, message: "Airline not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Airline details retrieved successfully",
      airline,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.updateAirline = async (req, res) => {
  const { airlineId } = req.params;
  const { name, logo, email, mobileNo, address } = req.body;

  // Validate required fields
  if (!name || !email || !mobileNo || !address) {
    return res
      .status(400)
      .json({ success: false, message: "All required fields must be filled" });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  // Mobile number format validation (11 digits)
  if (!/^\d{11}$/.test(mobileNo)) {
    return res.status(400).json({
      success: false,
      message: "Mobile number must be exactly 11 digits",
    });
  }

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(airlineId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid airline ID" });
  }

  try {
    const airline = await Airline.findById(airlineId);
    if (!airline) {
      return res
        .status(404)
        .json({ success: false, message: "Airline not found" });
    }

    // Check for duplicate name, email, or mobileNo (excluding current record)
    const existingAirline = await Airline.findOne({
      _id: { $ne: airlineId },
      $or: [
        { name: { $regex: `^${name}$`, $options: "i" } },
        { email },
        { mobileNo },
      ],
    });

    if (existingAirline) {
      if (existingAirline.name.toLowerCase() === name.toLowerCase()) {
        return res
          .status(409)
          .json({ success: false, message: "Airline name already exists" });
      }
      if (existingAirline.email === email) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
      if (existingAirline.mobileNo === mobileNo) {
        return res
          .status(409)
          .json({ success: false, message: "Mobile number already in use" });
      }
    }

    // Update the fields
    airline.name = name;
    airline.logo = logo || airline.logo;
    airline.email = email;
    airline.mobileNo = mobileNo;
    airline.address = address;

    const updatedAirline = await airline.save();

    return res.status(200).json({
      success: true,
      message: "Airline updated successfully",
      updatedAirline,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
