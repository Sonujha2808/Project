// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       let allProducts = JSON.parse(localStorage.getItem("products")) || [];

//       // If not in localStorage, fetch from API
//       if (allProducts.length === 0) {
//         try {
//           const res = await fetch("/api/products/all");
//           const data = await res.json();

//           allProducts = data.products || [];
//           localStorage.setItem("products", JSON.stringify(allProducts));
//         } catch (err) {
//           console.error("Error fetching products:", err);
//         }
//       }

//       // Debugging logs
//       console.log("Available products:", allProducts);
//       console.log("Looking for product with ID:", productId);

//       const foundProduct = allProducts.find((p) => p._id === productId);
//       if (foundProduct) {
//         setProduct(foundProduct);
//       } else {
//         console.warn("Product not found with ID:", productId);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (!product) return <div>Product not found. 😢</div>;

//   return (
//     <div className="product-details-page">
//       <img
//         src={`/uploads/${product.imageUrl || product.image}`} // fallback in case API gives 'image'
//         alt={product.name}
//         style={{ maxWidth: "300px" }}
//       />
//       <h1>{product.name}</h1>
//       <h2>₹{product.price}</h2>
//       {product.originalPrice && <p>Original: ₹{product.originalPrice}</p>}
//       <p>{product.description}</p>
//       {product.rating && <p>⭐ {product.rating.toFixed(1)} Rating</p>}

//       {/* Example: Reviews section */}
//       <div className="reviews">
//         <h3>Reviews</h3>
//         <p>No reviews yet. Be the first one!</p>
//       </div>

//       {/* Add-to-cart button can be added here */}
//     </div>
//   );
// };

// export default ProductDetails;






import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // make sure the route is set as /product/:id
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Product not found or server error.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
};

export default ProductDetails;
