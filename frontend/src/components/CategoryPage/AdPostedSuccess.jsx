import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowUpRight, Eye } from "lucide-react";

const AdPostedSuccess = () => {
  const navigate = useNavigate();
  const [adDetails, setAdDetails] = useState(null);

  useEffect(() => {
    // Get the last posted ad details from localStorage
    const lastPostedAd = JSON.parse(localStorage.getItem("lastPostedAd"));
    if (lastPostedAd) {
      setAdDetails(lastPostedAd);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        {/* Success Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">Congratulations!</h1>
          <p className="text-lg text-center text-gray-600 mt-2">
            Your Ad will go live shortly...
          </p>
        </div>

        {/* Ad Preview Card */}
        {adDetails && (
          <div className="border rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-4">
              {adDetails.photos && adDetails.photos.length > 0 ? (
                <img 
                  src={adDetails.photos[0]} 
                  alt={adDetails.adTitle} 
                  className="w-20 h-20 object-cover rounded-md"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 text-xs">No image</p>
                </div>
              )}
              <div>
                <h3 className="font-semibold">{adDetails.adTitle}</h3>
                <p className="text-gray-600">₹ {adDetails.price}</p>
                <p className="text-sm text-gray-500">{adDetails.brand} {adDetails.model}</p>
              </div>
            </div>
          </div>
        )}

        {/* Promotion Section */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-center mb-2">
            Reach more buyers and sell faster
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Upgrade your Ad to a top position
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
        <button 
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
  onClick={() => navigate("/main")} // Changed from "/premium-listing" to "/main"
>
  <ArrowUpRight className="mr-2" size={20} />
  Sell Faster Now
</button>
          
          <button 
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            onClick={() => navigate("/main")}
          >
            <Eye className="mr-2" size={20} />
            Preview Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdPostedSuccess;
