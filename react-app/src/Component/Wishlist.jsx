import React, { useState, useEffect } from "react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedItems);
  }, []);

  const handleRemove = (index) => {
    const updatedWishlist = wishlistItems.filter((_, i) => i !== index);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlistItems.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: "100px" }} />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
