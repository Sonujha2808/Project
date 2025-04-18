// import axios from "axios";

// const API_URL = "http://localhost:5000/api/products";

// // ✅ Upload product (Admin)
// export const uploadProduct = async (product) => {
//   try {
//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("category", product.category);
//     formData.append("description", product.description);
//     formData.append("price", product.price);
//     formData.append("image", product.image); // Ensure image is included

//     const response = await axios.post(`${API_URL}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error uploading product:", error.response?.data || error.message);
//     return { success: false, error: error.response?.data || error.message };
//   }
// };

// // ✅ Fetch all products
// export const getAllProducts = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/all`);
//     return response.data.products;
//   } catch (error) {
//     console.error("Error fetching all products:", error.response?.data || error.message);
//     return [];
//   }
// };

// // ✅ Fetch products by category
// export const getProductsByCategory = async (category) => {
//   try {
//     const response = await axios.get(`${API_URL}?category=${category}`);
//     return response.data.products;
//   } catch (error) {
//     console.error("Error fetching products by category:", error.response?.data || error.message);
//     return [];
//   }
// };

// // ✅ Ensure all functions are exported
// export default {
//   uploadProduct,
//   getAllProducts,
//   getProductsByCategory,
// };








/// api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// ✅ Upload product (Admin)
export const uploadProduct = async (product) => {
  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("price", product.price);

    // ✅ Ensure product.images is an array
    const images = product.images || [];
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await axios.post(`${API_URL}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

// ✅ Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching all products:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const encodedCategory = encodeURIComponent(category.toLowerCase());
    const response = await axios.get(`${API_URL}?category=${encodedCategory}`);
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error.response?.data || error.message);
    return [];
  }
};
