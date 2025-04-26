import { useState } from "react";
import Navbar from "./Navbar";
import Menubar from "./Menubar";
import Home from "./Home";
import Footer from "./Footer";
import FloatingIcon from "../ChatBot/FloatingIcon";
import { MessageCircle } from "lucide-react";
import ChatBot from "../ChatBot/ChatBot";
import Banner from "./Banner";
import Popup from "./PopUpPage"; // Import the Popup component

const Main = () => {
  const [search, setSearch] = useState(""); // ✅ For search functionality
  const [menu, setMenu] = useState(""); // ✅ For filtering by menu
  const [showChatBot, setShowChatBot] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Add state for popup

  // Function to open the popup - now only used for manual triggers like button clicks
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Navbar setSearch={setSearch} />
      <Menubar setMenu={setMenu} openPopup={openPopup} /> {/* Pass openPopup to Menubar */}
      <Banner />
      {/* Quote Section */}
      <div className="w-full text-center bg-gradient-to-r from-yellow-100 to-yellow-300 p-4 rounded-lg my-5 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">
          🚀 Buy Smart, Sell Fast – Get the Best Deals in Just a Few Clicks!
        </h2>
      </div>
      <Home 
        updateWishlist={() => {}} // Dummy function (optional)
        search={search}
        menu={menu}
      />
      <Footer />
      <FloatingIcon />
      <button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-5 right-5 bg-[#388691] text-white p-4 rounded-full shadow-lg hover:bg-[#2e6c73]"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* ChatBot Window */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
      
      {/* Popup for Amazing Deals - only shown when manually triggered */}
      <Popup isOpen={isPopupOpen} closePopup={closePopup} />
    </div>
  );
};

export default Main;
