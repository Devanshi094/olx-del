import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import an icon for back arrow

const Offers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white-100">
      {/* Navbar with Back Arrow */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        <button onClick={() => navigate("/main")} className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h1 className="text-5xl font-bold text-center mb-16 mt-12">Special Offers!</h1>

        {/* Flash Sale Section */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-3/4">
          <h2 className="text-lg font-semibold mb-2">⚡ Flash Sale: Starting from 20% Off UPTO 50% Off</h2>
          <p className="text-gray-700 mb-4">Limited time offer, grab your deals now!</p>
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>
        </div>

        {/* Close Button */}
        <button 
          className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => navigate("/main")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Offers;
