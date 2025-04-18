// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   cart: { type: Array, default: [] },
//   wishlist: { type: Array, default: [] },
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("User", userSchema);
