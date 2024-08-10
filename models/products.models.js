const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    variations: {
      size: {
        type: String,
      },
      color: {
        type: String,
      },
      material: {
        type: String,
      },
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Product = mongoose.model("Products", productSchema);

module.exports = Product;

// `name`: String
// `description`: String
// `price`: Number
// `stock`: Number
// `variations`: [Object] (size, color, material)
// `isHidden`: Boolean
