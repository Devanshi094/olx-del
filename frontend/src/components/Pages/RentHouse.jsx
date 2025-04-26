import  { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./RentHouse"; 
import n1 from "../../assets/property/n1.jpeg";
import n2 from "../../assets/property/n2.jpeg";
import n3 from "../../assets/property/n3.jpeg";
import n4 from "../../assets/property/n4.jpeg";
import n5 from "../../assets/property/n5.jpeg";
import n6 from "../../assets/property/n6.jpeg";
import n7 from "../../assets/property/n7.jpeg";
import m1 from "../../assets/property/m1.jpeg";
import m2 from "../../assets/property/m2.jpeg";
import m3 from "../../assets/property/m3.jpeg";
import m4 from "../../assets/property/m4.jpeg";
import m5 from "../../assets/property/m5.jpeg";
import d1 from "../../assets/property/d1.jpeg";
import d2 from "../../assets/property/d2.jpeg";
import d3 from "../../assets/property/d3.jpeg";
import d4 from "../../assets/property/d4.jpeg";
import c1 from "../../assets/property/c1.jpeg";
import c2 from "../../assets/property/c2.jpeg";
import c3 from "../../assets/property/c3.jpeg";
import c4 from "../../assets/property/c4.jpeg";
import c5 from "../../assets/property/c5.jpeg";
import c6 from "../../assets/property/c6.jpeg";
import b1 from "../../assets/property/b1.jpeg";
import b2 from "../../assets/property/b2.jpeg";
import b3 from "../../assets/property/b3.jpeg";
import b4 from "../../assets/property/b4.jpeg";
import b5 from "../../assets/property/b5.jpeg";

const defaultProperties = [
  {
    _id: "1",
    type: "House",
    price: "60,000",
    bedroom: 3,
    superBuiltUpArea: 1500,
    bathroom: 2,
    furnishing: "Fully Furnished",
    listedBy: "Owner",
    bachelorsAllowed: true,
    facing: "North",
    carpetArea: 1400,
    location: "New Delhi",
    floorNo: 1,
    projectName: "Green Valley",
    images: [n1, n2, n3, n4, n5, n6, n7]
  },
  {
    _id: "2",
    type: "Apartment",
    price: "55,000",
    bedroom: 2,
    superBuiltUpArea: 1200,
    bathroom: 2,
    furnishing: "Fully Furnished",
    listedBy: "Agent",
    bachelorsAllowed: false,
    facing: "East",
    carpetArea: 1100,
    location: "Mumbai",
    floorNo: 10,
    projectName: "Skyline Towers",
    images: [m1, m2, m3, m4, m5]
  },
  {
    _id: "3",
    type: "Apartment",
    price: "55,000",
    bedroom: 2,
    superBuiltUpArea: 1500,
    bathroom: 1,
    furnishing: "Luxury Full Furnished House",
    listedBy: "Owner",
    bachelorsAllowed: true,
    facing: "North",
    carpetArea: 1400,
    location: "Delhi",
    floorNo: 1,
    projectName: "Green Valley",
    images: [d1, d2, d3, d4]
  },
  {
    _id: "4",
    type: "Apartment",
    price: "70,000",
    bedroom: 2,
    superBuiltUpArea: 1600,
    bathroom: 1,
    furnishing: "Fully Furnished",
    listedBy: "Owner",
    bachelorsAllowed: true,
    facing: "South",
    carpetArea: 1400,
    location: "Bangalore",
    floorNo: 5,
    projectName: "Royal Residency",
    images: [b1, b2, b3, b4, b5]
  },
  {
    _id: "5",
    type: "House",
    price: "95,000",
    bedroom: 3,
    superBuiltUpArea: 2500,
    bathroom: 2,
    furnishing: "Luxury Fully Furnished House",
    listedBy: "Owner",
    bachelorsAllowed: true,
    facing: "West",
    carpetArea: 2200,
    location: "Chennai",
    floorNo: 1,
    projectName: "Green Acres",
    images: [c1, c2, c3, c4, c5, c6]
  }
];

const RentHouse = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/renthouse");
        const data = await response.json();
        console.log(data);

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(defaultProperties);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts(defaultProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // ✅ No missing dependencies

  const handleCloseClick = () => {
    navigate("/main");
  };

  return (
    <>
    <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        <button onClick={() => navigate("/rental")} className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </nav>
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
        Available Properties for Rent
      </h2>

      {loading ? (
        <p className="text-center text-xl text-gray-700">Loading...</p>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  className="bg-white rounded-lg shadow-xl overflow-hidden group transition-transform duration-300 ease-in-out transform hover:scale-105"
                  key={product._id}
                >
                  <div className="flex overflow-x-auto">
                    {product.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.projectName} image ${index + 1}`}
                        className="w-1/3 h-64 object-cover mr-2 rounded-lg"
                      />
                    ))}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-700">{product.type}</h3>
                    <p className="text-lg text-gray-600 mb-4">₹{product.price}/month</p>
                    <p><span className="font-semibold">Bedrooms:</span> {product.bedroom}</p>
                    <p><span className="font-semibold">Super Built-up Area:</span> {product.superBuiltUpArea} sqft</p>
                    <p><span className="font-semibold">Bathrooms:</span> {product.bathroom}</p>
                    <p><span className="font-semibold">Furnishing:</span> {product.furnishing}</p>
                    <p><span className="font-semibold">Listed by:</span> {product.listedBy}</p>
                    <p><span className="font-semibold">Bachelors Allowed:</span> {product.bachelorsAllowed ? "Yes" : "No"}</p>
                    <p><span className="font-semibold">Facing:</span> {product.facing}</p>
                    <p><span className="font-semibold">Carpet Area:</span> {product.carpetArea} sqft</p>
                    <p><span className="font-semibold">Location:</span> {product.location}</p>
                    <p><span className="font-semibold">Floor No:</span> {product.floorNo}</p>
                    <p><span className="font-semibold">Project Name:</span> {product.projectName}</p>
                    <Link to={`/rent-detail`}>
                      <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-500">
                        Would Love to Rent
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-700">No properties available at the moment.</p>
          )}
        </>
      )}

      <div className="text-center mt-6">
        <button onClick={handleCloseClick} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500">
          Close & Go to Main Page
        </button>
      </div>
    </div>
    </>
  );
};

export default RentHouse;
