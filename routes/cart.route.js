const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const Authorization = require("../middlewares/authorization");

const { addToCart, viewCart } = require("../controllers/cart.controller");

router.post("/", Authorization, authentication, addToCart);
router.get("/", Authorization, authentication, viewCart);

module.exports = router;
