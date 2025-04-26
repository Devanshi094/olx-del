import { useNavigate } from "react-router-dom"; 
import PropTypes from "prop-types";

const Popup = ({ isOpen, closePopup }) => {
  const navigate = useNavigate(); 

  const handleNavigation = (path) => {
    navigate(path); 
    closePopup(); 
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-md transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full relative transform transition-all duration-300 ease-in-out scale-105">
        {/* Close Button */}
        <button
          onClick={() => {
            console.log("Closing popup...");
            closePopup();
          }}
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-800 transition-colors duration-300"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-[#183056] mb-6">
          Hey, looking for something? We&apos;ve got you covered!
        </h2>
        <div className="space-y-6 text-center">
          <button
            onClick={() => handleNavigation("/rental")}
            className="w-full bg-[#388691] text-white py-3 rounded-lg  text-xl transform hover:scale-105 transition-transform duration-200"
          >
            🚗 Rental Options
          </button>
          <button
            onClick={() => handleNavigation("/offers")}
            className="w-full bg-[#388691] text-white py-3 rounded-lg text-xl transform hover:scale-105 transition-transform duration-200"
          >
            🎁 Special Offers
          </button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default Popup;
