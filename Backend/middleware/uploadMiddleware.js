// const multer = require("multer");
// const path = require("path");

// // Multer storage setup
// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;


const multer = require("multer");
const path = require("path");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary storage before Cloudinary upload
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// File filter for images only
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

const upload = multer({ storage:multer.memoryStorage(), limits:{fileSize:10*1024*1024} });

module.exports = upload;

