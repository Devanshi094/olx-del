import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import an icon for back arrow

const ShopConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productName } = location.state || {};

  return (
    <>
     <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        <button onClick={() => navigate("/shop")} className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </nav>
    <div className="min-h-screen flex flex-col items-center justify-center bg-white 400 to-teal-400 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-3/4">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎊 Amazing! You Grabbed This Offer! 🎊</h1>
        <h2 className="text-lg font-semibold">Your order for <span className="text-blue-500">{productName}</span> is confirmed.</h2>
        <p className="text-gray-700 mb-4">It will be shipped to you within *6 working days*. Stay tuned!</p>

        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/main")}
        >
          Back to Home
        </button>
      </div>
    </div>
    </>
  );
};

export default ShopConfirm;