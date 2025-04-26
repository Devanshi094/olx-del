import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./components/HomePage/Main";
import Details from "./components/ProductDetailsPage/Details";
import Category from "./components/CategoryPage/Category";
import Wishlist from "./components/HomePage/Wishlist";
import Car from "./components/CategoryPage/Car";
import Property from "./components/CategoryPage/Property";
import Mobile from "./components/CategoryPage/Mobile";
import SignIn from "./components/LoginPage/SignIn";
import Bikes from "./components/CategoryPage/Bikes";
import Electronic from "./components/CategoryPage/Electronic";
import Fashion from "./components/CategoryPage/Fashion";
import Books from "./components/CategoryPage/Books";
import Furniture from "./components/CategoryPage/Furniture";
import FloatingIcon from "./components/ChatBot/FloatingIcon";
import ContactForm from "./components/HomePage/ContactUs";
import CartPage from "./components/HomePage/CartPage";
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import ManageAds from "./components/AdminPanel/ManageAds";
import ManageUsers from "./components/AdminPanel/ManageUsers";
import AdminLogin from "./components/AdminPanel/AdminLogin";
import AboutUs from "./components/HomePage/AboutUs";
import Rental from "./components/Pages/Rental";
import Offers from "./components/Pages/Offers";
import RentCar from "./components/Pages/RentCar";
import RentBike from "./components/Pages/RentBike";
import RentRequest from "./components/Pages/RentRequest";
import Shop from "./components/Pages/Shop";
import ShopConfirm from "./components/Pages/ShopConfirm";
import RentHouse from "./components/Pages/RentHouse";
import RentDetails from "./components/Pages/RentDetails";
import PopUp from "./components/HomePage/PopUpPage";
import ChatBox from "./components/ProductDetailsPage/ChatBox";
import CheckoutPage from "./components/HomePage/CheckoutPage";
import Payment from "./components/HomePage/Payment";
import OrderConfirmation from "./components/HomePage/OrderConfirmation";
import AdPostedSuccess from "./components/CategoryPage/AdPostedSuccess";
import Profile from "./components/ProfilePage/Profile";

export default function App() {
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Check if we're on the main page AND user hasn't seen the popup before
    if (location.pathname === "/main") {
      const hasSeenPopup = localStorage.getItem("hasSeenPopup");
      
      if (!hasSeenPopup) {
        console.log("Opening popup for first time visitor...");
        setIsPopupOpen(true);
        // Mark that they've seen it
        localStorage.setItem("hasSeenPopup", "true");
      }
    } else {
      setIsPopupOpen(false);
    }
  }, [location.pathname]);

  const closePopup = () => {
    console.log("Closing popup...");
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* ✅ Popup should be outside <Routes> */}
      <PopUp isOpen={isPopupOpen} closePopup={closePopup} />

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
        <Route path="/category" element={<Category />} />
        <Route path="/details" element={<Details />} />
        <Route path="/chat" element={<FloatingIcon />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/category/cars" element={<Car />} />
        <Route path="/category/property" element={<Property />} />
        <Route path="/category/mobile" element={<Mobile />} />
        <Route path="/category/bikes" element={<Bikes />} />
        <Route path="/category/electronics" element={<Electronic />} />
        <Route path="/category/fashion" element={<Fashion />} />
        <Route path="/category/books" element={<Books />} />
        <Route path="/category/furniture" element={<Furniture />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/rent-car" element={<RentCar />} />
        <Route path="/rent-bike" element={<RentBike />} />
        <Route path="/rent-request" element={<RentRequest />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop-confirm" element={<ShopConfirm />} />
        <Route path="/rent-house" element={<RentHouse />} />
        <Route path="/rent-detail" element={<RentDetails />} />
        <Route path="/inbox" element={<ChatBox currentUser={{id: "defaultUser", name: "User"}} chatUser={{id: "defaultSeller", name: "Seller"}} />} />        
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/billing" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/ad-posted-success" element={<AdPostedSuccess />} />
        <Route path="/profile" element={<Profile />} />




        {/* ✅ Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-ads" element={<ManageAds />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
      </Routes>
    </>
  );
}
