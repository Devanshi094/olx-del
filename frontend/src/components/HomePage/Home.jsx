import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = ({ search, updateWishlist, menu }) => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, adsRes] = await Promise.all([
          fetch("http://localhost:5000/api/products"),
          fetch("http://localhost:5000/api/ads"),
        ]);
    
        const productsData = await productsRes.json();
        const adsData = await adsRes.json();
    
        // Combine both products and ads
        const combinedData = [...productsData, ...adsData];
        console.log("Fetched Products and Ads:", combinedData);
        setProducts(combinedData);
      } catch (error) {
        console.error("Error fetching products and ads:", error);
      }
    };
    
    fetchProducts();
  
    // Load wishlist from localStorage
    const storedLikes = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLikedProducts(storedLikes.map(item => item._id || item.id)); // Extract just the IDs
  }, []);
  
  // Use filteredProducts instead of filteredAds
  const filteredProducts = products
  .filter((product) => {
    const title = product?.title || product?.name || "";
    return title.toLowerCase().includes(search.toLowerCase());
  })
  .filter((product) => (menu ? product.category === menu : true));

  // Toggle like functionality
  const toggleLike = (product) => {
    // Get current wishlist
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    // Check if product is already in wishlist by ID
    const productId = product._id;
    const isLiked = currentWishlist.some(item => (item._id === productId || item.id === productId));
    
    let updatedWishlist;
    if (isLiked) {
      // Remove from wishlist
      updatedWishlist = currentWishlist.filter(item => (item._id !== productId && item.id !== productId));
    } else {
      // Add to wishlist
      updatedWishlist = [...currentWishlist, product];
    }
    
    // Update localStorage and state
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    
    // Update likedProducts IDs for UI rendering
    setLikedProducts(updatedWishlist.map(item => item._id || item.id));
    
    // Update parent component if needed
    if (updateWishlist) {
      updateWishlist(updatedWishlist);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5 p-5">
      {filteredProducts?.map((data) => (
        <div
          key={data?._id}
          className="relative flex flex-col border-2 border-black-500 bg-white-50 rounded-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          {/* Like Button */}
          <button
            className="absolute top-2 right-2 group"
            onClick={() => toggleLike(data)}
            aria-label={`Like ${data?.title}`}
          >
            {likedProducts.includes(data._id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="w-8 h-8 transform group-active:scale-125 transition-transform duration-200 ease-in-out"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                stroke="pink"
                strokeWidth="2"
                className="w-8 h-8 transform group-active:scale-125 transition-transform duration-200 ease-in-out"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>

          {/* Clicking on product takes to details page */}
          <Link
            to="/details"
            state={{ data }}
            className="flex flex-col items-center text-center"
          >
            <img
              src={data?.images?.[0] || data?.image || data?.photos?.[0]} 
              alt={data?.title || data?.name || "Product"}
              className="w-full h-48 object-contain mb-3 rounded-lg"
            />
            <h2 className="font-semibold text-purple-600">
              {data?.title || data?.name || "No Title"}
            </h2>
            <h1 className="font-bold text-xl text-pink-600">Rs. {data?.price}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

Home.propTypes = {
  search: PropTypes.string.isRequired,
  updateWishlist: PropTypes.func.isRequired,
  menu: PropTypes.string.isRequired,
};

export default Home;
