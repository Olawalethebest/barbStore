const { unauthorisedAccess } = require("../constants/messages");

const checkAdmin = (req, res, next) => {
  const { role } = req.query;

  try {
    if (role !== "admin") throw new Error(unauthorisedAccess);
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message || unauthorisedAccess,
    });
  }
};

module.exports = checkAdmin;
