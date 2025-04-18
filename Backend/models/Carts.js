const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Cart", cartSchema);
