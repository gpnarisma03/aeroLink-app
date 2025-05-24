const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../auth");

module.exports.registerUser = async (req, res) => {
  const reqBody = req.body;

  // Check if req.body exists
  if (!reqBody) {
    return res
      .status(400)
      .json({ success: false, message: "Request body is missing" });
  }

  const { firstName, lastName, email, mobileNo, password, dateOfBirth, role } =
    reqBody;

  // Basic field validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobileNo ||
    !password ||
    !dateOfBirth
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Mobile number: Must be 11 digits
  if (!/^\d{11}$/.test(mobileNo)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Mobile number must be exactly 11 digits",
      });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  // Password length check
  if (password.length < 8) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
  }

  try {
    // Check if email or mobile number already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNo }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
      if (existingUser.mobileNumber === mobileNo) {
        return res
          .status(409)
          .json({ success: false, message: "Mobile number already in use" });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber: mobileNo,
      dateOfBirth: new Date(dateOfBirth),
      role: role || "user", // default to 'user' if not provided
    });

    const result = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userDetails: {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        mobileNumber: result.mobileNumber,
        role: result.role,
        createdOn: result.createdOn,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing email format" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // Create access token (implement createAccessToken according to your auth logic)
    const accessToken = auth.createAccessToken(user);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports.userDetails = (req, res) => {
  // Validate the user ID
  if (!req.user || !mongoose.Types.ObjectId.isValid(req.user.id)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }

  User.findById(req.user.id)
    .lean()
    .then((user) => {
      if (!user) {
        // Match the expected response in Postman: 'not found'
        return res.status(404).send({ message: "User not found" }); // Updated message
      }

      const {
        _id,
        firstName,
        lastName,
        email,
        mobileNo,
        dateOfBirth,
        bookingHistory,
        role,
      } = user;

      const userProfile = {
        _id,
        firstName,
        lastName,
        email,
        mobileNo,
        dateOfBirth,
        bookingHistory,
        role,
      };

      return res.status(200).send(userProfile);
    })
    .catch((err) => {
      return errorHandler(err, req, res);
    });
};

module.exports.updateUserDetails = async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, email, mobileNumber, dateOfBirth } = req.body;

  if (!firstName && !lastName && !email && !mobileNumber && !dateOfBirth) {
    return res
      .status(400)
      .json({
        success: false,
        message: "At least one field must be provided to update",
      });
  }

  // Mobile number validation
  if (mobileNumber && !/^\d{11}$/.test(mobileNumber)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Mobile number must be exactly 11 digits",
      });
  }

  // Email format validation
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
  }

  try {
    // Check for existing email or mobile number in other users
    if (email || mobileNumber) {
      const existingUser = await User.findOne({
        $or: [
          email ? { email } : null,
          mobileNumber ? { mobileNumber } : null,
        ].filter(Boolean),
        _id: { $ne: userId },
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return res
            .status(409)
            .json({ success: false, message: "Email already in use" });
        }
        if (existingUser.mobileNumber === mobileNumber) {
          return res
            .status(409)
            .json({ success: false, message: "Mobile number already in use" });
        }
      }
    }

    const updateFields = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(mobileNumber && { mobileNumber }),
      ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      userDetails: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
        dateOfBirth: updatedUser.dateOfBirth,
        role: updatedUser.role,
        updatedOn: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
