const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/index");
const { v4: uuidv4 } = require("uuid");

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      {
        email: user.email,
        _id: uuidv4(),
      },
      process.env.JWT_SECRET || "somethingsecret",
      {
        expiresIn: "24h",
      }
    );

    res.set("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { Login };
