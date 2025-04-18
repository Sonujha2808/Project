// import React from "react";
// import "./ProductCard.css";
// import { saveCartToServer } from "../utils/cartHelper"; // Import helper

// const ProductCard = ({ product, onAddToWishlist }) => {
//   const handleAddToCart = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Check if product already exists in cart
//     const index = existingCart.findIndex((item) => item.productId === product._id);

//     let updatedCart;
//     if (index > -1) {
//       // If already exists, increase quantity
//       updatedCart = [...existingCart];
//       updatedCart[index].quantity += 1;
//     } else {
//       // If not, add with quantity 1 and product details
//       const newItem = {
//         productId: product._id,
//         name: product.name,
//         price: product.price,
//         imageUrl: product.imageUrl,
//         quantity: 1,
//       };
//       updatedCart = [...existingCart, newItem];
//     }

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     if (user?._id) {
//       saveCartToServer(user._id, updatedCart);
//     }

//     alert("✅ Added to cart!");
//   };

//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: "15px",
//         width: "220px",
//         borderRadius: "10px",
//       }}
//     >
//       <img
//         src={product.imageUrl}
//         alt={product.name}
//         style={{ width: "100%", height: "150px", objectFit: "cover" }}
//       />
//       <h4 style={{ margin: "10px 0" }}>{product.name}</h4>
//       <p>₹{product.price}</p>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           gap: "5px",
//         }}
//       >
//         <button
//           onClick={handleAddToCart}
//           style={{
//             padding: "6px 10px",
//             backgroundColor: "green",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={onAddToWishlist}
//           style={{
//             padding: "6px 10px",
//             backgroundColor: "#e91e63",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Wishlist
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;








import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { saveCartToServer } from "../utils/cartHelper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product, onAddToWishlist }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  // 🔁 React to login updates
  useEffect(() => {
    const updateUser = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      setUser(loggedInUser);
    };
    window.addEventListener("user-logged-in", updateUser);
    return () => window.removeEventListener("user-logged-in", updateUser);
  }, []);

  const handleAddToCart = () => {
    if (!user || !user._id) {
      toast.warn("⚠ Please log in to add items to your cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((item) => item.productId === product._id);

    let updatedCart;
    if (index > -1) {
      updatedCart = [...existingCart];
      updatedCart[index].quantity += 1;
    } else {
      const newItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      };
      updatedCart = [...existingCart, newItem];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    saveCartToServer(user._id, updatedCart);

    toast.success("✅ Added to cart!");
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => (e.target.src = "/fallback-image.jpg")}
      />
      <h4>{product.name}</h4>
      <div className="price-section">
        <span className="price">₹{product.price}</span>{" "}
        {product.originalPrice && (
          <>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">({calculateDiscount()}% off)</span>
          </>
        )}

      </div>
      {product.rating && <div className="rating">⭐ {product.rating.toFixed(1)}</div>}
      {/* <h4>{product.name}</h4> */}
{product.description && <p className="product-description">{product.description}</p>}

      <div className="action-buttons">
        <button onClick={handleAddToCart} className="btn-cart">🛒 Add to Cart</button>
        <button onClick={onAddToWishlist} className="btn-wishlist">❤️ Wishlist</button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ProductCard;
