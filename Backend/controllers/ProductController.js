const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// ✅ Upload Product (Ensure category is stored correctly)
exports.uploadProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder: "products" });

    const newProduct = new Product({
      name,
      category: category.trim().toLowerCase(),  // ✅ Normalize category
      description,
      price,
      imageUrl: result.secure_url,
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get products by category (Ensure correct filtering)
exports.getProductsByCategory = async (req, res) => {
  try {
    console.log(req.query);
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    const normalizedCategory = category.trim().toLowerCase();  // ✅ Ensure category matches stored format
    const products = await Product.find({ category: normalizedCategory });

    if (products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found in this category" });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
