const jwt = require("jsonwebtoken");
require("dotenv").config();

const { unauthorisedAccess } = require("../constants/messages");

const Authorization = (req, res, next) => {
  const authorization = req.headers.authorization || "";

  try {
    if (!authorization) throw new Error(unauthorisedAccess);

    const tokenSplit = authorization.split(" ");

    jwt.verify(tokenSplit[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new Error(err);
      req.params.userEmail = decoded.email;

      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: "false",
      message: error.message || unauthorisedAccess,
    });
  }
};

module.exports = Authorization;
