const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const Authorization = require("../middlewares/authorization");
const checkRole = require("../middlewares/checkRole");
const {
  createProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
  viewStockLevel,
  // hideProduct,
  getAvailableProducts,
  getAvailableProduct,
  addToCart,
  removeFromCart,
  viewCart,
  checkout,
} = require("../controllers/product.controller");

//customer
router.get("/customer", Authorization, authentication, getAvailableProducts);
router.post("/customer/cart", Authorization, authentication, addToCart);
router.get("/customer/cart", Authorization, authentication, viewCart);
router.post("/customer/checkout", Authorization, authentication, checkout);
router.get("/customer/:id", Authorization, authentication, getAvailableProduct);

//admin
router.post("/", Authorization, authentication, checkRole, createProduct);
router.put("/:id", Authorization, authentication, checkRole, editProduct);
router.delete("/:id", Authorization, authentication, checkRole, deleteProduct);
router.get("/", Authorization, authentication, checkRole, getProducts);
router.get("/:id", Authorization, authentication, checkRole, getProduct);
router.get(
  "/stock-notifications",
  Authorization,
  authentication,
  checkRole,
  viewStockLevel
);
// router.patch("/hide/:id", hideProduct);

module.exports = router;
