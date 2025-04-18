// const express = require("express");
// const { uploadProduct, getAllProducts, upload } = require("../controllers/ProductController");

// const router = express.Router();

// router.post("/upload", upload.single("image"), uploadProduct);
// router.get("/all", getAllProducts);

// module.exports = router;



const express = require("express");
const {
  getAllProducts,
  getProductById,
  uploadProduct
} = require("../controllers/ProductController");

const upload = require("../config/multerConfig");

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get single product by ID
router.get("/:id", getProductById);

// Upload product with multiple images under field name "image"
router.post("/", upload.array("images"), uploadProduct);

module.exports = router;
