import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cross1Icon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Load wishlist items from localStorage when the component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Function to remove item from wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id && item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Item removed from wishlist!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Dispatch storage event to update Navbar count
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* New Navbar with centered title */}
      <div className="w-full text-white py-4 px-6 shadow-md flex items-center justify-between mb-6">
        <button
          className="flex items-center gap-2 text-[#183056] transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        
        <h1 className="text-2xl font-bold text-center text-[#183056] bg-white flex-grow">
          My Wishlist
        </h1>
        
        <div className="w-20"></div> {/* Empty div for balanced spacing */}
      </div>

      <div className="p-5">
        {wishlist.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#183056] text-xl mb-4">Your wishlist is empty</p>
            <button 
              onClick={() => navigate('/main')}
              className="bg-[#388691] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wishlist.map((data, index) => (
              <div
                key={index}
                className="relative flex flex-col border border-[#388691] bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all"
              >
                {/* Remove from Wishlist Button */}
                <button
                  className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-red-100 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(data?._id || data?.id);
                  }}
                >
                  <Cross1Icon className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700" />
                </button>

                {/* Link to Product Details */}
                <Link
                  to="/details"
                  state={{ data }}
                  className="flex flex-col items-center"
                >
                  {/* Check if images array exists and has items, or fall back to image property */}
                  {data?.images?.[0] ? (
                    <img
                      src={data.images[0]}
                      alt={data?.title || "Product"}
                      className="w-full h-48 object-contain mb-3 rounded-lg"
                    />
                  ) : data?.image ? (
                    <img
                      src={data.image}
                      alt={data?.title || "Product"}
                      className="w-full h-48 object-contain mb-3 rounded-lg"
                    />
                  ) : (
                    <p className="text-red-500">Image not available</p>
                  )}

                  <h1 className="font-bold text-xl text-[#183056]">
                    Rs. {data?.price || "N/A"}/-
                  </h1>
                  <h2 className="font-semibold text-[#388691]">
                    {data?.title || "No Title"}
                  </h2>
                  <h3 className="text-gray-500">{data?.category || "No Category"}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
