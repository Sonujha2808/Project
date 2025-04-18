// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
//   }, []);

//   const handleQuantityChange = (index, delta) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleRemove = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const getTotalAmount = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const deliveryCharge = getTotalAmount() < 100 ? 50 : 0;
//   const finalAmount = getTotalAmount() + deliveryCharge;

//   const handlePlaceOrder = () => {
//     localStorage.removeItem("cart");
//     navigate("/thankyou");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🛒 Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cartItems.map((item, index) => (
//             <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
//               <img src={item.imageUrl[0]} alt={item.name} style={{ width: "100px" }} />
//               <h4>{item.name}</h4>
//               <p>₹{item.price}</p>
//               <div>
//                 Quantity:
//                 <button onClick={() => handleQuantityChange(index, -1)}>-</button>
//                 {item.quantity}
//                 <button onClick={() => handleQuantityChange(index, 1)}>+</button>
//               </div>
//               <button onClick={() => handleRemove(index)}>Remove</button>
//             </div>
//           ))}

//           <div style={{ marginTop: "20px" }}>
//             <h3>Total Price: ₹{getTotalAmount()}</h3>
//             <h4>Delivery Charges: ₹{deliveryCharge}</h4>
//             <h2>Total Amount: ₹{finalAmount}</h2>
//             <button onClick={handlePlaceOrder} style={{ marginTop: "10px", padding: "10px 20px" }}>
//               Place Order
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;




import React, { useEffect, useState } from "react";
import { loadCartFromServer, saveCartToServer } from "../utils/cartHelper";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      loadCartFromServer(user._id).then(setCartItems);
    } else {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(stored);
    }
  }, []);

  const updateLocalAndServerCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (user?._id) saveCartToServer(user._id, updatedCart);
  };

  const handleQuantityChange = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    updateLocalAndServerCart(updated);
  };

  const handleRemove = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    updateLocalAndServerCart(updated);
  };

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const deliveryCharge = getTotalAmount() < 100 ? 50 : 0;
  const finalAmount = getTotalAmount() + deliveryCharge;

  const handlePlaceOrder = () => {
    localStorage.removeItem("cart");
    if (user?._id) saveCartToServer(user._id, []);
    setCartItems([]);
    navigate("/thankyou");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: "100px" }} />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <div>
                Quantity:
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
              </div>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <h3>Total Price: ₹{getTotalAmount()}</h3>
            <h4>Delivery Charges: ₹{deliveryCharge}</h4>
            <h2>Total Amount: ₹{finalAmount}</h2>
            <button onClick={handlePlaceOrder} style={{ marginTop: "10px", padding: "10px 20px" }}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
