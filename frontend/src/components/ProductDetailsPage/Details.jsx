import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowLeft,
  Tag,
  FileText,
  MapPin,
  ShieldAlert,
  Key,
  QrCode,
  AlertCircle,
  UserX,
  X,
} from "lucide-react";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: initialData } = location.state || {};
  const [data, setData] = useState(initialData || {});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    initialData?.images?.[0] || initialData?.image
  );

  // Fetch product details when the component loads
  useEffect(() => {
    const fetchData = async () => {
      if (!initialData?._id) return;
    
      try {
        const response = await fetch(
          `http://localhost:5000/api/${initialData?.isAdmin ? "products" : "ads"}/${initialData?._id}`
        );
        if (response.ok) {
          const result = await response.json();
    
          // Check if images and data are correctly received
          console.log("Fetched Data:", result);
          setData(result);
          setSelectedImage(result?.images?.[0] || result?.image);
        } else {
          console.error("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    if (!initialData) {
      fetchData();
    }
  }, [initialData]);

  if (!data) {
    return (
      <p className="text-center text-xl text-red-500 mt-20">
        Product not found.
      </p>
    );
  }

  const addToCart = () => {
    // Get current cart items from localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if item is already in cart
    const isInCart = currentCart.some(item => item._id === data._id);
    
    if (isInCart) {
      toast.info("This item is already in your cart!");
      return;
    }
    
    // Add item to cart
    const updatedCart = [...currentCart, data];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Show success message
    toast.success("Added to cart successfully!");
    
    // Dispatch storage event to update cart count in navbar if needed
    window.dispatchEvent(new Event("storage"));
  };
  

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-700">Product Details</h1>
        <div className="w-6"></div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row p-8">
        {/* Left Section - Images */}
        <div className="flex flex-col items-center w-full lg:w-2/3">
          <img
            src={selectedImage}
            alt="Product"
            className="w-[700px] h-[600px] object-contain rounded-lg transition-transform duration-300"
          />
          <div className="flex mt-4 space-x-2">
            {data?.images?.map((img, index) => (
              <div 
              key={index}
              className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-md border-2 border-transparent hover:border-[#FFC7ED] cursor-pointer transition duration-300"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-20 mr-8">
        <h1 className="text-4xl font-bold text-[#304463]">{data?.title || "No Title"}</h1>
        <p className="text-lg text-gray-600 mt-2">{data?.category || "No Category"}</p>
          {/* Price */}
          <div className="mt-6 flex items-center space-x-3">
            <Tag size={24} className="text-[#7D8ABC]" />
            <h2 className="text-2xl font-semibold text-[#7D8ABC]">Price:</h2>
            <p className="text-lg font-medium text-gray-800">
  Rs. {data?.price || "N/A"}/-
</p>
          </div>

          {/* Location */}
          <div className="mt-4 flex items-center space-x-3">
            <MapPin size={24} className="text-[#7D8ABC]" />
            <h2 className="text-2xl font-semibold text-[#7D8ABC]">Location:</h2>
            <p className="text-lg font-medium text-gray-800">
              {data?.location || "Not specified"}
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <div className="flex items-center space-x-3">
              <FileText size={24} className="text-[#7D8ABC]" />
              <h2 className="text-2xl font-semibold text-[#7D8ABC]">
                Description:
              </h2>
            </div>
            <p className="text-gray-700 mt-2">{data?.description || "No Description"}</p>
          </div>

          {/* Make Offer Button */}
          <button
            className="w-full mt-6 p-4 bg-[#7D8ABC] text-white rounded-lg text-xl font-medium hover:bg-[#304463] transition duration-300"
            onClick={() => setShowPopup(true)}
          >
            Make Offer
          </button>
          {/* Add to Cart Button - Only for Fashion, Electronics, and Others categories */}
          {(data?.category === "Fashion" || data?.category === "Electronics" || data?.category === "Others") && (
  <button
    className="w-full mt-3 p-4 bg-[#72a4b7] text-white rounded-lg text-xl font-medium hover:bg-[#304463] transition duration-300"
    onClick={() => {
      addToCart();
      navigate("/cart"); // Add this line to navigate to cart page
    }}
  >
    Add to Cart
  </button>
)}
        </div>
      </div>

      {/* Safety Tips Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-[#7D8ABC] mb-4">
              Tips for a Safe Deal
            </h2>

            {/* Safety Tips */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Key size={20} className="text-[#7D8ABC]" />
                <p className="text-gray-700">
                  Don&apos;t enter UPI PIN/OTP, scan unknown QR codes, or click
                  unsafe links.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <ShieldAlert size={20} className="text-[#7D8ABC]" />
                <p className="text-gray-700">
                  Never give money or product in advance.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <UserX size={20} className="text-[#7D8ABC]" />
                <p className="text-gray-700">Report suspicious users to OLX.</p>
              </div>

              <div className="flex items-center space-x-3">
                <AlertCircle size={20} className="text-[#7D8ABC]" />
                <p className="text-gray-700">
                  Don&apos;t share personal details like photos or IDs.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <QrCode size={20} className="text-[#7D8ABC]" />
                <p className="text-gray-700">
                  Be cautious during buyer-seller meetings.
                </p>
              </div>
            </div>

            {/* Continue to Offer Button */}
            <button
              className="w-full mt-6 p-4 bg-[#7D8ABC] text-white rounded-lg text-xl font-medium hover:bg-[#304463] transition duration-300"
              onClick={() => {
                setShowPopup(false);
                navigate("/inbox");
              }}
            >
              Continue to Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;