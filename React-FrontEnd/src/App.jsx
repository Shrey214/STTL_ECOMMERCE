import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./commonPages/login";
import Signup from "./commonPages/signup";
import VerifyEmail from "./commonPages/VerifyEmail";
import Navbar from "./components/common/Navbar";
import Home from "./commonPages/Home";
import Products from "./commonPages/Products";
import Cart from "./commonPages/Cart";
import About from './commonPages/About';
import ProductDetailsPage from "./components/common/ProductDetailsPage";
import Footer from "./components/common/Footer";
import Contact from "./commonPages/Contact";
function App() {
  
  return (
    <div className="min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />

        <Route path="verify-email" element={<VerifyEmail />} />

        <Route path="login" element={<Login />} />

        <Route path="products" element={<Products />} />

        <Route path="/cart" element={<Cart/>} />
        <Route path="product/details/:id" element={<ProductDetailsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="about" element={<About/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
