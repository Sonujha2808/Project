const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");
// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MakeInIndia",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});
// Multer Upload Middleware (Accept multiple images under 'images' field)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // Accept up to 5 images under 'images' field
module.exports = upload;
