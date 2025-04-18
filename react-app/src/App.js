// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./Component/Header/Header";
// import Footer from "./Component/Footer/Footer";
// import CategorySlider from "./Component/Category";
// import CategoryPage from "./Component/CategoryPage"; // Page for clicked category

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Routes>
//           <Route path="/" element={<CategorySlider />} />
//           <Route path="/category/:category" element={<CategoryPage />} /> 
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
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



function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    <div className="app-container">
      {!isAdminRoute && <Header />}
      <PromoSlider />
      <Routes>
        <Route path="/" element={<CategorySlider />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
      {!isAdminRoute && <FeaturesSection />}
      {!isAdminRoute && <Footer />}
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
