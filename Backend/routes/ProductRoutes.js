const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { uploadProduct, getAllProducts, getProductsByCategory } = require("../controllers/ProductController");
const upload = require("../middleware/uploadMiddleware");
// ✅ Upload a product
router.post("/", upload.single("image"), uploadProduct);
// ✅ Get all products (optional separate route)
router.get("/all", getAllProducts);
// ✅ Get product by ID — must be above "/" route to avoid shadowing
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
// ✅ Get products by category or all if no category filter
router.get("/", getProductsByCategory);

module.exports = router;
