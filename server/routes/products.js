const express = require("express");
const Product = require("../models/Product");
const auth2 = require("../middleware/auth2");
const router = express.Router();

// Get all products
router.get("/", auth2, async (req, res) => {
  try {
    const products = await Product.find();
    const productCatalogue = products.map((product) => {
      if (req.user) {
        //send discounted price for logged in user
        return product;
      }
      return { ...product._doc, discountedPrice: null };
    });

    res.json(productCatalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
