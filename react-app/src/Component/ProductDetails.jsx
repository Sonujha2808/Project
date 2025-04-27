import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      let allProducts = JSON.parse(localStorage.getItem("products")) || [];
  
      // If not found in localStorage, fetch from server
      if (allProducts.length === 0) {
        try {
          const res = await fetch("/api/products"); // Example API
          allProducts = await res.json();
          localStorage.setItem("products", JSON.stringify(allProducts));
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      }
  
      const foundProduct = allProducts.find(p => p._id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    };
  
    fetchProduct();
  }, [productId]);
  

  if (!product) return <div>Product not found. 😢</div>;


  return (
    <div className="product-details-page">
      <img src={product.imageUrl} alt={product.name} />
      <h1>{product.name}</h1>
      <h2>₹{product.price}</h2>
      {product.originalPrice && <p>Original: ₹{product.originalPrice}</p>}
      <p>{product.description}</p>
      {product.rating && <p>⭐ {product.rating.toFixed(1)} Rating</p>}

      {/* Example: Reviews section */}
      <div className="reviews">
        <h3>Reviews</h3>
        <p>No reviews yet. Be the first one!</p>
      </div>

      {/* You can add Add-to-cart button here also */}
    </div>
  );
};

export default ProductDetails;
