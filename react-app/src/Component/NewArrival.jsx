import React from "react";
import "./NewArrivals.css";
import Boat from "../Assets/boatearpods1.jpg";

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
    <img src={Boat} alt="Wireless Headphones" />
    <h4>Wireless Headphones</h4>
    <p>₹1,500</p>
    <div className="rating">⭐⭐⭐⭐⭐</div>
  </div>
  <div className="small-product-card">
    <img src={Boat} alt="Gaming Headset" />
    <h4>Gaming Headset</h4>
    <p>₹2,500</p>
    <div className="rating">⭐⭐⭐⭐</div>
  </div>
  <div className="small-product-card">
    <img src={Boat} alt="Noise Cancelling" />
    <h4>Noise Cancelling</h4>
    <p>₹3,000</p>
    <div className="rating">⭐⭐⭐⭐⭐</div>
  </div>
  <div className="small-product-card">
    <img src={Boat} alt="Bass Boost" />
    <h4>Bass Boost</h4>
    <p>₹1,800</p>
    <div className="rating">⭐⭐⭐⭐</div>
  </div>
  <div className="small-product-card">
    <img src={Boat} alt="Bluetooth Speaker" />
    <h4>Bluetooth Speaker</h4>
    <p>₹2,200</p>
    <div className="rating">⭐⭐⭐⭐⭐</div>
  </div>
  <div className="small-product-card">
    <img src={Boat} alt="Smart Earbuds" />
    <h4>Smart Earbuds</h4>
    <p>₹2,800</p>
    <div className="rating">⭐⭐⭐⭐</div>
  </div>
</div>

      </div>

      {/* <div className="promo-banner">
        <img src={Boat} alt="Promo" />
        <div className="promo-content">
          <h3>Up to 40% Off</h3>
          <p>Best-selling audio gadgets on sale.</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div> */}
    </div>
  );
};

export default NewArrivals;
