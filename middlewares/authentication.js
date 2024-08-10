const User = require("../models/user.models");

const { unauthorisedAccess } = require("../constants/messages");

const authentication = async (req, res, next) => {
  const { userEmail } = req.params;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) throw new Error(unauthorisedAccess);
    req.params.user_id = user.user_id;
    req.query.role = user.role;
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};
module.exports = authentication;
