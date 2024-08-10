const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const Authorization = require("../middlewares/authorization");
const { checkout } = require("../controllers/checkout.controller");

router.post("/", Authorization, authentication, checkout);

module.exports = router;
