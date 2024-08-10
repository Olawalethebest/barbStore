const express = require("express");
const router = express.Router();
const {
  createUser,
  changePermission,
} = require("../controllers/user.controller");

router.post("/register", createUser);
router.patch("/change-permission", changePermission);

module.exports = router;
