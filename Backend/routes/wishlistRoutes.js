const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// Save or update wishlist
router.post("/save", async (req, res) => {
  const { userId, items } = req.body;

  try {
    const existing = await Wishlist.findOne({ userId });

    if (existing) {
      existing.items = items;
      await existing.save();
    } else {
      await Wishlist.create({ userId, items });
    }

    res.status(200).json({ msg: "Wishlist saved" });
  } catch {
    res.status(500).json({ msg: "Error saving wishlist" });
  }
});

// Get wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.status(200).json(wishlist || { items: [] });
  } catch {
    res.status(500).json({ msg: "Error fetching wishlist" });
  }
});

module.exports = router;
