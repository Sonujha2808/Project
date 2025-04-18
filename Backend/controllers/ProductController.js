
// const Product = require("../models/Product");
// const cloudinary = require("../config/cloudinary");

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({category:'phone'});
//     console.log(products);
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     console.log(product);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });
//     res.status(200).json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// const uploadProduct = async (req, res) => {
//   try {
//     const { name, category, description, price } = req.body;
//     const images = req.files;

//     if (!images || images.length === 0) {
//       return res.status(400).json({ success: false, message: "Images are required" });
//     }

//     const uploadedImages = await Promise.all(
//       images.map(async (file) => {
//         const uploadResult = await cloudinary.v2.uploader.upload(file.path);
//         return uploadResult.secure_url;
//       })
//     );

//     const newProduct = new Product({
//       name,
//       category,
//       description,
//       price,
//       imageUrl: uploadedImages,
//     });

//     await newProduct.save();
//     res.status(201).json({ success: true, product: newProduct });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // ✅ Correct export
// module.exports = {
//   getAllProducts,
//   getProductById,
//   uploadProduct,
// };






const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// ✅ Get all products or by category
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params
    const filter = category ? { category: category.toLowerCase() } : {}; // Optional filter

    const products = await Product.find(filter); // Fetch products
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✅ Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✅ Upload product with Cloudinary images
const uploadProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "Images are required" });
    }

    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        const uploadResult = await cloudinary.v2.uploader.upload(file.path);
        return uploadResult.secure_url;
      })
    );

    const newProduct = new Product({
      name,
      category: category.toLowerCase(), // Store in lowercase for consistency
      description,
      price,
      imageUrl: uploadedImages,
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Export all controller functions
module.exports = {
  getAllProducts,
  getProductById,
  uploadProduct,
};
