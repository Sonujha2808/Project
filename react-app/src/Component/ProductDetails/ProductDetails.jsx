import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams(); // make sure the route is set as /product/:id
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      // Add check for id
      if (!productId) {
        throw new Error('Product ID is missing');
      }
      
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message || "Product not found or server error.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]); // Correctly depends on id parameter

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        style={{ maxWidth: "300px" }} 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/fallback-image.jpg";
        }}
      />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
};

export default ProductDetails;
