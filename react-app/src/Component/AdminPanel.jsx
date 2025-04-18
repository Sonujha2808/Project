// import React, { useState } from "react";
// import { uploadProduct } from "./Services/api";

// const AdminPanel = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     description: "",
//     price: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setProduct({ ...product, image: e.target.files[0] }); // ✅ Fix: Store file
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting Product:", product); // ✅ Debugging Step
//     const result = await uploadProduct(product);
//     console.log("Upload Response:", result); // ✅ Debugging Step
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
//       <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
//       <textarea name="description" placeholder="Description" onChange={handleChange} required />
//       <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
//       <input type="file" accept="image/*" onChange={handleImageChange} required /> {/* ✅ Fix */}
//       <button type="submit">Upload Product</button>
//     </form>
//   );
// };

// export default AdminPanel;










// import React, { useState } from "react";
// import { uploadProduct } from "./Services/api";
// import "./AdminPanel.css";

// const AdminPanel = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     description: "",
//     price: "",
//     images: [],
//   });

//   const [message, setMessage] = useState(""); 
//   const [loading, setLoading] = useState(false); // ✅ Added Loading State

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setProduct({ ...product, images: Array.from(e.target.files) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("category", product.category);
//     formData.append("description", product.description);
//     formData.append("price", product.price);

//     product.images.forEach((image) => {
//         formData.append("images", image); // ✅ Ensures images are added
//     });

//     try {
//         const result = await uploadProduct(formData);

//         if (result.success) {
//             setMessage("✅ Product uploaded successfully!");
//             setProduct({ name: "", category: "", description: "", price: "", images: [] });
//         } else {
//             setMessage(`❌ Upload failed: ${result.message}`);
//         }
//     } catch (error) {
//         setMessage("❌ An error occurred while uploading.");
//     } finally {
//         setLoading(false);
//     }
// };

//   return (
//     <div className="admin-dashboard">
//       <aside className="sidebar">
//         <h2>Admin Panel</h2>
//       </aside>

//       <div className="admin-content">
//         <header className="admin-header">
//           <h1>MadeInIndia Admin Page</h1>
//         </header>

//         <div className="admin-container">
//           <h2>Add New Product</h2>
//           {message && <p className="upload-message">{message}</p>} 

//           <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
//             <label>Product Name</label>
//             <input type="text" name="name" value={product.name} onChange={handleChange} required />

//             <label>Category</label>
//             <select name="category" value={product.category} onChange={handleChange} required>
//               <option value="">Select Category</option>
//               <option value="Electronics">Electronics</option>
//               <option value="Clothing">Clothing</option>
//             </select>

//             <label>Description</label>
//             <textarea name="description" value={product.description} onChange={handleChange} required />

//             <label>Price</label>
//             <input type="number" name="price" value={product.price} onChange={handleChange} required />

//             <label>Upload Images</label>
//             <input type="file" accept="image/*" multiple onChange={handleImageChange} required />

//             <button type="submit" className="upload-btn" disabled={loading}>
//               {loading ? "Uploading..." : "Upload Product"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useState } from "react";
import { uploadProduct } from "./Services/api";
import "./AdminPanel.css";

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
    } else {
      alert("Error uploading product: " + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
      
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Upload Product</button>
    </form>
  );
};

export default AdminPanel;
