import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { saveCartToServer } from "../../utils/cartHelper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToWishlist }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      setUser(loggedInUser);
    };
    window.addEventListener("user-logged-in", updateUser);
    return () => window.removeEventListener("user-logged-in", updateUser);
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent Link click

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((item) => item.productId === product._id);

    let updatedCart;
    if (index > -1) {
      updatedCart = [...existingCart];
      updatedCart[index].quantity += 1;
      toast.info("🛒 Product quantity updated in cart!");
    } else {
      const newItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      };
      updatedCart = [...existingCart, newItem];
      toast.success("✅ Product added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (user && user._id) {
      saveCartToServer(user._id, updatedCart);
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault(); // Prevent Link click
    onAddToWishlist();
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="product-card">
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />
        <h4>{product.name}</h4>

        <div className="price-section">
          <span className="price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₹{product.originalPrice}</span>
              <span className="discount">({calculateDiscount()}% off)</span>
            </>
          )}
        </div>

        {product.rating && <div className="rating">⭐ {product.rating.toFixed(1)}</div>}

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}

        <div className="action-buttons">
          <button onClick={handleAddToCart} className="btn-cart">
            {addedToCart ? "✔️ Added!" : "🛒 Add to Cart"}
          </button>
          <button onClick={handleAddToWishlist} className="btn-wishlist">
            ❤️ Wishlist
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={900} />
      </div>
    </Link>
  );
};

export default ProductCard;
