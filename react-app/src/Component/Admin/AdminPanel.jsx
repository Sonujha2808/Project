import React, { useState } from "react";
import { uploadProduct } from "../Services/api";
import "./AdminPanel.css"; // If you have custom styles

const AdminPanel = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const categories = ["Laptop", "Phone", "Watch", "Camera", "Headphone", "Video Game"];

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.category || !product.price || !product.image) {
      alert("Please fill all fields before submitting!");
      return;
    }

    console.log("Submitting Product:", product);
    const result = await uploadProduct(product);

    if (result.success) {
      alert("Product uploaded successfully!");
      setProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        image: null,
      });

      // Reset file input manually after successful upload
      document.querySelector('input[type="file"]').value = "";
    } else {
      alert("Error uploading product: " + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="admin-form">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      <button type="submit">Upload Product</button>
    </form>
  );
};

export default AdminPanel;