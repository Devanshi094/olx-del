import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import {
  HeartIcon,
  ChatBubbleIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
  Globe,
  MapPin,
  ChevronDown,
  ShoppingCart,
  User,
  Package,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import useAuth from "../../context/useAuth";



const Navbar = ({ setSearch }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [profileDropdown, setProfileDropdown] = useState(false); // ✅ Profile Dropdown State

  // Fetch location suggestions
  const fetchLocations = async (query) => {
    if (!query) {
      setSuggestedLocations([]);
      return;
    }
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();
    setSuggestedLocations(data.map((place) => place.display_name));
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    fetchLocations(value);
  };

  // ✅ Auth Context to show user info if logged in
  const { user, logout } = useAuth();

  console.log("AuthContext loaded");
console.log("Exported useAuth:", useAuth);


  return (
    <div className="flex items-center p-2 bg-gradient-to-r from-blue-100 via-green-100 to-blue-200 shadow-lg">
      {/* Logo */}
      <img
        src={logo}
        className="w-36 h-12 ml-7 hover:scale-110 transition-transform duration-300 my-0"
        alt="logo"
        onClick={() => navigate("/main")}
      />

      {/* Location Input */}
      <div className="relative ml-10">
        <div
          className="flex border-2 w-72 p-2 border-blue-300 bg-white rounded-lg shadow-md cursor-pointer items-center"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
          <input
            placeholder="Search city, area or locality"
            className="ml-3 outline-none text-sm w-full"
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
          <ChevronDown
            className={`w-5 h-5 ml-4 text-gray-600 transition-transform ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Dropdown Suggestions */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-2 p-2 z-50">
            <div className="flex items-center gap-2 p-2 text-blue-600 cursor-pointer border-b border-gray-200 hover:bg-gray-100">
              <Globe className="w-5 h-5" />
              <span>Use current location</span>
            </div>

            {suggestedLocations.length > 0 ? (
              suggestedLocations.map((loc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setLocation(loc);
                    setDropdownOpen(false);
                  }}
                >
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{loc}</span>
                </div>
              ))
            ) : (
              <p className="p-2 text-sm text-gray-500">No results found...</p>
            )}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex border-2 ml-8 h-12 border-green-300 bg-white rounded-lg shadow-md items-center">
        <input
          placeholder="Search cars, mobile phones and more...."
          className="ml-3 w-[600px] outline-none text-sm"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="w-5 h-5 mr-3 text-gray-600" />
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6 ml-6">
        {/* Wishlist */}
        <div
          className="flex flex-col items-center cursor-pointer hover:text-blue-800 hover:scale-110 transition-transform"
          onClick={() => navigate("/wishlist")}
        >
          <HeartIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Wishlist</span>
        </div>

        {/* Inbox */}
        <div
          className="flex flex-col items-center cursor-pointer hover:text-blue-800 hover:scale-110 transition-transform"
          onClick={() => navigate("/inbox")}
        >
          <ChatBubbleIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Inbox</span>
        </div>

        {/* Cart */}
        <div
          className="flex flex-col items-center cursor-pointer hover:text-blue-800 hover:scale-110 transition-transform"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs mt-1">Cart</span>
        </div>
      </div>

      {/* ✅ Show Profile or Sign In */}
      <div className="ml-6 relative">
      {user ? (
  <div
    className="flex items-center cursor-pointer"
    onClick={() => setProfileDropdown(!profileDropdown)}
  >
    <div className="w-10 h-10 rounded-full bg-[#388691] flex items-center justify-center text-white font-bold text-lg">
      {user.username ? user.username.charAt(0).toUpperCase() : 
       user.name ? user.name.charAt(0).toUpperCase() : 
       user.email ? user.email.charAt(0).toUpperCase() : "U"}
    </div>
    <span className="ml-2 font-medium">{user.username || user.name || user.email?.split('@')[0] || "User"}</span>
    <ChevronDown
      className={`w-5 h-5 ml-1 text-gray-600 transition-transform ${
        profileDropdown ? "rotate-180" : "rotate-0"
      }`}
    />
  </div>
) : (
  <button
    className="px-6 py-2 bg-[#183056] text-white rounded-lg shadow-md hover:bg[#183056] transition-all"
    onClick={() => navigate("/signin")}
  >
    Sign In
  </button>
)}

        {/* ✅ Profile Dropdown */}
        {profileDropdown && user && (
  <div className="absolute top-12 right-0 w-72 bg-white border rounded-lg shadow-lg mt-2 p-4 z-50">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-[#388691] flex items-center justify-center text-white font-bold text-xl">
        {user.username ? user.username.charAt(0).toUpperCase() : 
         user.name ? user.name.charAt(0).toUpperCase() : 
         user.email ? user.email.charAt(0).toUpperCase() : "U"}
      </div>
      <div className="ml-4">
        <h3 className="font-semibold">{user.username || user.name || user.email?.split('@')[0] || "User"}</h3>
        <button
          className="mt-1 text-sm text-blue-600 hover:underline"
          onClick={() => navigate("/profile")}
        >
          View and edit profile
        </button>
      </div>
    </div>

            {/* Menu Items */}
            <div
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/my-ads")}
            >
              <User className="w-5 h-5 text-gray-700" />
              <span>My ADS</span>
            </div>
            <div
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/business-packages")}
            >
              <Package className="w-5 h-5 text-gray-700" />
              <span>Buy Business Packages</span>
            </div>
            <div
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/billing")}
            >
              <CreditCard className="w-5 h-5 text-gray-700" />
              <span>Bought Packages & Billing</span>
            </div>
            <div
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/help")}
            >
              <HelpCircle className="w-5 h-5 text-gray-700" />
              <span>Help</span>
            </div>
            <div
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5 text-gray-700" />
              <span>Settings</span>
            </div>
            <div
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="text-red-500">Logout</span>
            </div>
          </div>
        )}
      </div>

      {/* SELL Button */}
      <div
        className="w-28 flex items-center justify-center h-12 ml-6 cursor-pointer rounded-full border border-yellow-400 bg-yellow-100 hover:bg-yellow-300 hover:shadow-lg transition-all"
        onClick={() => navigate("/category")}
      >
        <h1 className="font-bold text-lg">+ SELL</h1>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default Navbar;
