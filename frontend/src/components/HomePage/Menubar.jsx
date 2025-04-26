import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 

const Menubar = ({ setMenu, openPopup }) => {
  return (
    <div className="flex shadow-sm h-12 px-8 justify-center items-center bg-white relative">
      {/* All Categories with click handler */}
      <div className="cursor-pointer">
        <h1 
          className="text-gray-700 font-medium"
          onClick={() => setMenu("")} // Try using empty string instead of "All"
        >
          All Categories
        </h1>
      </div>

      {/* Updated menu items with new category names */}
      <div className="flex gap-8 ml-12">
        <h1
          onClick={() => setMenu("Fashion")}
          className="cursor-pointer text-gray-700 hover:text-black"
        >
          Fashion
        </h1>
        <h1
          onClick={() => setMenu("Bikes")}
          className="cursor-pointer text-gray-700 hover:text-black"
        >
          Bikes
        </h1>
        <h1
          onClick={() => setMenu("Property")}
          className="cursor-pointer text-gray-700 hover:text-black"
        >
          Property
        </h1>
        <h1
          onClick={() => setMenu("Cars")}
          className="cursor-pointer text-gray-700 hover:text-black"
        >
          Cars
        </h1>
        <h1
          onClick={() => setMenu("Furniture")}
          className="cursor-pointer text-gray-700 hover:text-black"
        >
          Furniture
        </h1>
        <h1
          onClick={() => setMenu("Electronics")}
          className="cursor-pointer text-gray-700 hover:text-black"
        >
          Electronics
        </h1>
        <h1
          onClick={() => setMenu("Others")}
          className="cursor-pointer text-gray-700 hover:text-black"
        >
          Others
        </h1>
      </div>

      {/* Contact Us - Using React Router Link for navigation */}
      <Link
        to="/ContactForm"
        className="ml-8 cursor-pointer text-gray-700 hover:text-black"
      >
        <h1>Contact Us</h1>
      </Link>

      <span
          onClick={openPopup}
          className="ml-8 cursor-pointer text-gray-700 hover:text-black"
        >
          Amazing Deals
        </span>
    </div>
  );
};

Menubar.propTypes = {
  setMenu: PropTypes.func.isRequired,
  openPopup: PropTypes.func.isRequired,
};

export default Menubar;
