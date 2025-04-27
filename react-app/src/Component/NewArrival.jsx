import React from "react";
import "./NewArrivals.css"; // We'll style it here
import Boat from ".././Assets/boatearpods1.jpg";
const NewArrivals = () => {
  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="arrivals-grid">
        <div className="featured-product">
          <img src={Boat} alt="Samsung Galaxy New" />
          <h3>Samsung Galaxy New</h3>
          <p>₹80,000</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>

        <div className="small-products">
          <div className="small-product-card">
            <img src={Boat} alt="Headphone" />
            <h4>Wireless Headphones</h4>
            <p>₹1,500</p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="small-product-card">
            <img src="/path-to-headphone2.jpg" alt="Headphone" />
            <h4>Gaming Headset</h4>
            <p>₹2,500</p>
            <div className="rating">⭐⭐⭐⭐</div>
          </div>
          <div className="small-product-card">
            <img src={Boat} alt="Headphone" />
            <h4>Noise Cancelling</h4>
            <p>₹3,000</p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </div>

      <div className="promo-banner">
        <img src={Boat} alt="Promo" />
        <div className="promo-content">
          <h3>Up to 40% Off On Digital Items</h3>
          <p>Special offer on best-selling audio gadgets.</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
