

import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import CategorySlider from "./Component/Category";
import CategoryPage from "./Component/CategoryPage";
import AdminPanel from "./Component/AdminPanel";
import FeaturesSection from "./Component/Features/Features";
import Cart from "./Component/Cart";
import Wishlist from "./Component/Wishlist";
import ThankYou from "./Component/ThankYou";
import PromoSlider from "./Component/PromoSlider";
import NewArrivals from "./Component/NewArrival";
import ProductDetails from "./Component/ProductDetails";
import AddressPage from "./Component/AddressPage";
import PaymentPage from "./Component/PaymentPage";
import { motion, AnimatePresence } from "framer-motion";

function Layout() {
  const location = useLocation();
  const hideLayoutRoutes = ["/admin", "/address","/payment","/cart", "/wishlist","/thankyou"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {!shouldHideLayout && <Header />}
      {!shouldHideLayout && <PromoSlider />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CategorySlider />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!shouldHideLayout && <NewArrivals />}
      {!shouldHideLayout && <FeaturesSection />}
      {!shouldHideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
