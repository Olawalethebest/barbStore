const express = require("express");
const Product = require("../models/products.models");
const Cart = require("../models/cart.models");
const User = require("../models/user.models");
const Order = require("../models/order.models");
// const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe secret key

const checkout = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({
      user_id,
    });
    console.log(user);
    // Fetch user's cart items
    const cartItems = await Cart.find({ user_id: user._id }).populate(
      "product_id"
    );

    if (cartItems.length === 0) throw new Error("Cart is empty");

    let totalAmount = 0;

    const orderItems = cartItems.map((item) => {
      const productTotalPrice =
        Number(item.product_id.price) * Number(item.quantity);
      totalAmount += productTotalPrice;

      return {
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product_id.price,
      };
    });
    console.log(totalAmount);
    // Create Stripe Payment Intent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(totalAmount * 100), // Amount in cents
    //   currency: 'usd',
    //   payment_method_types: ['card'],
    // });
    console.log({
      user_id: user._id,
      items: orderItems,
      totalAmount,
      paymentIntentId: "saab", //pamtnet refernce
      status: "Pending",
    });
    // Create Order in database
    const order = new Order({
      user_id: user._id,
      items: orderItems,
      totalAmount,
      paymentIntentId: "saab", //pamtnet refernce
      status: "Pending",
    });

    await order.save();

    // Clear user's cart
    await Cart.deleteMany({ user_id: user._id });

    res.status(201).json({
      message: "Checkout initiated successfully",
      //   clientSecret: paymentIntent.client_secret, // Return client secret for Stripe payment
      order,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkout,
};
