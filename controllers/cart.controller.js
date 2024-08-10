const Product = require("../models/products.models");
const Cart = require("../models/cart.models");
const User = require("../models/user.models");
const { v4: uuidv4 } = require("uuid");
const { validateAddToCartSchema } = require("../validations/cart.validation");

const addToCart = async (req, res) => {
  const { user_id } = req.params;

  const { product_id, quantity } = req.body;

  try {
    const user = await User.findOne({
      user_id,
    });

    if (!user_id || !user) throw new Error("unauthorised accesss.....");

    const { error } = validateAddToCartSchema(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);

    const product = await Product.findOne({ product_id, isHidden: false });

    if (!product) throw new Error(`Product ${product_id} not found`);

    const cart = await Cart.findOne({
      user_id: user._id,
      product_id: product._id,
    });
    if (cart) {
      cart.quantity += quantity;
      await cart.save();
    } else {
      const newCart = new Cart({
        cart_id: uuidv4(),
        user_id: user._id,
        product_id: product._id,
        quantity,
      });
      await newCart.save();
    }

    return res.status(200).json({
      status: true,
      message: "Product added to cart",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};

const viewCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    if (!user_id) throw new Error("unauthorised accesss.....");

    const user = await User.findOne({
      user_id,
    });

    const cart = await Cart.find({ user_id: user._id });

    return res.status(200).json({
      status: true,
      message: "Cart",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "An error occured.....",
    });
  }
};
module.exports = {
  addToCart,
  viewCart,
};
