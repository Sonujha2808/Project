import React from "react";
import "./Features.css"; // Import the CSS file

const features = [
  {
    id: 1,
    image: "https://cdn-icons-png.flaticon.com/512/10436/10436877.png", // Replace with your image URL
    title: "Free Shipping",
    description: "Our free shipping policy applies to all orders, regardless of order value or destination.",
  },
  {
    id: 2,
    image: "https://cdn-icons-png.flaticon.com/512/10436/10436851.png", // Replace with your image URL
    title: "Secure Payments",
    description: "Your payments are always safe, secure, and protected at all times.",
  },
  {
    id: 3,
    image: "https://cdn-icons-png.flaticon.com/512/10436/10436866.png", // Replace with your image URL
    title: "Support Online 24/7",
    description: "We are available 24/7 to assist you with any questions or issues you may have.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="features-container">
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <img src={feature.image} alt={feature.title} className="feature-icon" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
