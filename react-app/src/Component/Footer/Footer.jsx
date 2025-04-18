import React from "react";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter">
        <h2>Join Us & Get Updates</h2>
        <p>Sign up for exclusive offers, latest news, and updates</p>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter email address" />
          <button>Subscribe →</button>
        </div>
      </div>

      <hr className="divider" />

      {/* Footer Content */}
      <div className="footer-content">
        {/* Logo & Social Icons */}
        <div className="footer-section">
          <h2 className="logo">Made In India</h2>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaPinterestP />
          </div>
          <p>© 2023 Made In India. All Rights Reserved.</p>
        </div>

        {/* Get to Know Us */}
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">News & Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">How To Shop</a></li>
          </ul>
        </div>

        {/* Orders & Returns */}
        <div className="footer-section">
          <h3>Orders & Returns</h3>
          <ul>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Return & Exchange</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Selling Tips</a></li>
            <li><a href="#">Payment</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li><FiPhone /> (702) 555-0122</li>
            <li><FiMail /> electro@example.com</li>
            <li><FiMapPin /> 4517 Washington Ave, Manchester, Kentucky 495</li>
          </ul>
        </div>
      </div>

      <hr className="divider" />

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="policies">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Shipping Policy</a>
        </div>
        <div className="payment-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Apple_Pay_logo.svg" alt="Apple Pay" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Pay_Logo.svg" alt="Google Pay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
