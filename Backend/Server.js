// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const productRoutes = require("./routes/ProductRoutes");

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// app.use("/api/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/ProductRoutes");
const authRoutes = require("./routes/authRoutes");

const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");




dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // Add this

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
