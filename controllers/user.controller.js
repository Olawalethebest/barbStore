const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.models");
const { hashPassword, comparePassword } = require("../utils");
const {
  validateCreateUserSchema,
  validateChangePermissionSchema,
} = require("../validations/user.valudation");

const createUser = async (req, res) => {
  const { surname, othernames, email, phone, password } = req.body;
  try {
    const { error } = validateCreateUserSchema(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);

    const checkIfUserExists = await User.findOne({ email: email });

    if (checkIfUserExists) throw new Error("User already exists");

    const user = new User({
      user_id: uuidv4(),
      surname,
      othernames,
      email,
      phone,
      password,
      role: "customer",
    });

    const { hash } = await hashPassword(password);
    user.password = hash;
    await user.save();

    return res
      .status(200)
      .json({ status: "true", message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: error.message || "Internal server error",
    });
  }
};

const changePermission = async (req, res) => {
  const { email, role } = req.body;

  try {
    const { error } = validateChangePermissionSchema(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);

    await User.updateOne(
      {
        email,
      },
      {
        role: role,
      }
    );
    return res.status(200).json({
      status: true,
      message: "Permission updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  changePermission,
};
