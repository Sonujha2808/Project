// import React, { useState } from "react";
// import { FaShoppingCart, FaHeart, FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./Header.css";
// import LoginModal from "../LoginModal";
// import userIcon from "../../Assets/profile.gif";
// import userIcon2 from "../../Assets/search.gif";

// const Header = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
//   const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

//   return (
//     <>
//       <header className="header">
//         <div className="logo">
//           <img src="/logo.png" alt="Logo" />
//           <span>Make In India</span>
//         </div>

//         <FaBars className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} />

//         <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
//           <Link to="/">Home</Link>
//           <Link to="/category/Phone">Category</Link>
//           <Link to="#">About Us</Link>
//           <Link to="#">FAQ</Link>
//           <Link to="#">Blog</Link>
//           <Link to="#">Contact</Link>
//         </nav>

//         <div className="header-icons">
//           {/* Search icon */}
//           <img src={userIcon2} alt="Search" className="icon user-gif" />

//           {/* Wishlist */}
//           <Link to="/wishlist" className="icon-wrapper">
//             <FaHeart className="icon" />
//             <span className="cart-count">{wishlistItems.length}</span>
//           </Link>

//           {/* Cart */}
//           <Link to="/cart" className="icon-wrapper">
//             <FaShoppingCart className="icon" />
//             <span className="cart-count">{cartItems.length}</span>
//           </Link>

//           {/* User icon */}
//           <img
//             src={userIcon}
//             alt="User"
//             className="icon user-gif"
//             onClick={() => setShowModal(true)}
//           />
//         </div>
//       </header>

//       {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
//     </>
//   );
// };

// export default Header;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBars } from "react-icons/fa";
import "./Header.css";
import LoginModal from "../LoginModal";
import userIcon from "../../Assets/profile.gif";
import userIcon2 from "../../Assets/search.gif";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch cart and wishlist from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>Make In India</span>
        </div>

        <FaBars className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} />

        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Category</a>
          <a href="#">About Us</a>
          <a href="#">FAQ</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </nav>

        <div className="header-icons">
          <img src={userIcon2} alt="Search" className="icon user-gif" />

          {/* Wishlist */}
          <div
            className="icon-wrapper"
            onClick={() => navigate("/wishlist")}
            onMouseEnter={() => setShowWishlistDropdown(true)}
            onMouseLeave={() => setShowWishlistDropdown(false)}
          >
            <FaHeart className="icon" />
            <span className="cart-count">{wishlistItems.length}</span>
          </div>

          {/* Cart */}
          <div
            className="cart-container icon-wrapper"
            onClick={() => navigate("/cart")}
            onMouseEnter={() => setShowCartDropdown(true)}
            onMouseLeave={() => setShowCartDropdown(false)}
          >
            <FaShoppingCart className="icon" />
            <span className="cart-count">{cartItems.length}</span>
          </div>

          {/* User Login / Welcome */}
          {user ? (
            <div className="user-welcome">
              <span>Welcome, {user.name}!</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <img
              src={userIcon}
              alt="User"
              className="icon user-gif"
              onClick={() => setShowModal(true)}
            />
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Header;
