const { User } = require("../models"); 
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, password,role } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password,
      role: role || "user"
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.iduser,
    });

  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: error.errors});
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
