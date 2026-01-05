const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: Number,
      name: String,
      price: Number,
      image: String,
      category: String
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Get cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ error: "Failed to load cart" });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items.push(product);
    await cart.save();

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Remove item
router.post("/remove", async (req, res) => {
  const { userId, index } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json([]);

    cart.items.splice(index, 1);
    await cart.save();

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

module.exports = router;
