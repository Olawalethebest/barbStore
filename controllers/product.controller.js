const { v4: uuidv4 } = require("uuid");
const Product = require("../models/products.models");
const {
  validateCreateProductSchema,
  validateUpdateProductSchema,
} = require("../validations/product.validation");
//admin
const createProduct = async (req, res) => {
  const { name, description, price, stock, variations, isHidden } = req.body;

  try {
    const { error } = validateCreateProductSchema(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);

    const product = new Product({
      product_id: uuidv4(),
      name,
      description,
      price,
      stock,
      variations,
      isHidden,
    });
    await product.save();

    return res.status(201).json({
      status: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//admin
const editProduct = async (req, res) => {
  const { name, description, price, stock, variations, isHidden } = req.body;
  const { id } = req.params;
  try {
    const { error } = validateUpdateProductSchema(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);

    const updateProduct = await Product.updateOne({ product_id: id }, req.body);
    if (!updateProduct) throw new Error("Product not found");

    return res.status(200).json({
      status: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//admin
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.deleteOne({ product_id: id });
    if (!deleteProduct) throw new Error("Product not found");

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//admin
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) throw new Error("No products available");

    return res.status(200).json({
      status: true,
      message: "Available products",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//admin
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ product_id: id });
    if (!product) throw new Error(`Product ${id} not found`);

    return res.status(200).json({
      status: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//admin
const viewStockLevel = async (req, res) => {
  const { amount } = req.query || 10;
  try {
    const products = await Product.find({ stock: { $lt: amount } });

    if (!products) throw new Error("No products available");

    return res.status(200).json({
      status: true,
      message: "Products with low stock level",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//admin
// const hideProduct = async (req, res) => {
//   try {
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message || "An error occured.....",
//     });
//   }
// };

//customer
const getAvailableProducts = async (req, res) => {
  try {
    const products = await Product.find({ isHidden: false });

    if (!products) throw new Error("No products available");

    return res.status(200).json({
      status: true,
      message: "Available products",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//customer
const getAvailableProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ product_id: id, isHidden: false });
    if (!product) throw new Error(`Product ${id} not found`);

    return res.status(200).json({
      status: true,
      message: "Available product",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//customer
const addToCart = (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//customer
const removeFromCart = (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//customer
const viewCart = (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
//customer
const checkout = (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};

module.exports = {
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
};
