// const express = require("express");
// const { uploadProduct, getAllProducts, upload } = require("../controllers/ProductController");

// const router = express.Router();

// router.post("/upload", upload.single("image"), uploadProduct);
// router.get("/all", getAllProducts);

// module.exports = router;



// const express = require("express");
// const {
//   getAllProducts,
//   getProductById,
//   uploadProduct
// } = require("../controllers/ProductController");

// const upload = require("../config/multerConfig");

// const router = express.Router();

// // Get all products
// router.get("/", getAllProducts);

// // Get single product by ID
// router.get("/:id", getProductById);

// // Upload product with multiple images under field name "image"
// router.post("/", upload.array("images"), uploadProduct);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {
//   uploadProduct,
//   getAllProducts,
//   getProductsByCategory,
// } = require("../controllers/ProductController");
// const upload = require("../middleware/uploadMiddleware");

// // Upload a product
// router.post("/", upload.single("image"), uploadProduct);

// // Get all products
// router.get("/all", getAllProducts);

// // Get products by category
// router.get("/category/:category", getProductsByCategory); // changed to a proper route

// module.exports = router;






const express = require("express");
const router = express.Router();
const { uploadProduct, getAllProducts, getProductsByCategory } = require("../controllers/ProductController");
const upload = require("../middleware/uploadMiddleware");

// ✅ Upload a product
router.post("/", upload.single("image"), uploadProduct);

// ✅ Get all products
router.get("/all", getAllProducts);

// ✅ Get products by category
router.get("/", getProductsByCategory); // Changed from /category to / to match frontend API call

module.exports = router;
