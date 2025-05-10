// src/Component/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "./Services/api";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  // const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProductsByCategory(category);
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      alert(`${product.name} added to cart`);
    } else {
      alert(`${product.name} is already in the cart`);
    }
    // navigate("/cart");
  };

  const handleAddToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      alert(`${product.name} added to wishlist`);
    } else {
      alert(`${product.name} is already in the wishlist`);
    }
    // navigate("/wishlist");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{category} Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onAddToWishlist={() => handleAddToWishlist(product)}
            />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
