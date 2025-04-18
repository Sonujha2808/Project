const express = require("express");
const router = express.Router();
const Cart = require("../models/Carts");

// Save cart to MongoDB
router.post("/save", async (req, res) => {
  const { userId, cart } = req.body;
  try {
    let userCart = await Cart.findOne({ userId });

    if (userCart) {
      userCart.cartItems = cart;
    } else {
      userCart = new Cart({ userId, cartItems: cart });
    }

    await userCart.save();
    res.status(200).json({ msg: "Cart saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while saving cart" });
  }
});

// Load cart from MongoDB
router.get("/load/:userId", async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({ cart: userCart ? userCart.cartItems : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while loading cart" });
  }
});

module.exports = router;
