import axios from "axios";

// Save cart to backend
export const saveCartToServer = async (userId, cart) => {
  try {
    await axios.post("http://localhost:5000/api/cart/save", { userId, cart });
  } catch (error) {
    console.error("Error saving cart:", error.message);
  }
};

// Load cart from backend
export const loadCartFromServer = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/cart/load/${userId}`);
    return res.data.cart || [];
  } catch (error) {
    console.error("Error loading cart:", error.message);
    return [];
  }
};
