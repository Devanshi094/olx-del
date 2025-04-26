import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import an icon for back arrow
import "./RentBike.jsx"; // ✅ Fixed import
import item1 from "../../assets/random/item1.jpeg";
import item2 from "../../assets/random/item2.jpeg";
import item22 from "../../assets/random/item22.jpeg";
import item3 from "../../assets/random/item3.jpeg";
import item4 from "../../assets/random/item4.jpeg";
import item5 from "../../assets/random/item5.jpeg";
import item55 from "../../assets/random/item55.jpeg";
import item6 from "../../assets/random/item6.jpeg";

const Shop = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Trendy Oversized T-Shirt for men ",
      name: "StreetStyle Oversized Tee",
      price : " ₹999",
      location: "Mumbai, India",
      image: [item1],
      discount: "50%",
      payment : "₹499",
    },
    {
      id: 2,
      title: "Elegant Floral Dress",
      name: "Spring Bloom Maxi Dress",
      price : " ₹1400",
      location: "Bangalore, India",
      image: [item2,item22],
      discount: "30%",
      payment : "₹420 ",
    },
    {
      id: 3,
      title: "Wireless Bluetooth Earbuds",
      name: "BassBoost Pro Earbuds",
      price : " ₹2500",
      location: "Delhi, India",
      image: [item3],
      discount: "25%",
      payment : " ₹625 ",
    },
    {
      id: 4,
      title: "Casual Denim Jacket (Unisex)",
      name: "Urban Fit Denim Jacket",
      price : " ₹2000",
      location: "Pune, India",
      image: [item4],
      discount: "40%",
      payment : "₹1200 ",
    },
    {
      id: 5,
      title: "Smart Fitness Band",
      name: "FitTrack Pro Band",
      price : " ₹1056",
      location: "Hyderabad, India",
      image: [item5,item55],
      discount: "35%",
      payment : "₹686",
    },
    {
      id: 6,
      title: "Stylish Sneakers for men ",
      name: "ComfyWalk Running Shoes",
      price : " ₹8000",
      location: "Kolkata, India",
      image: [item6],
      discount: "50%",
      payment : "₹4000 ",
    },
  ];

  return (
    <>
     <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        <button onClick={() => navigate("/offers")} className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </nav>
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      <h1 className="text-3xl font-bold text-[#183056] mb-6">🔥 Flash Sale - 20% off Up to 50% Off! 🔥</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img src={product.image[0]} alt={product.name} className="w-70 h-40 object-cover rounded-lg mx-auto" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">{product.name}</p>
            <p className="text-gray-700 font-bold">Price : 
  <span className="line-through text-gray-500">{product.price}</span>  
  <span className="text-green-600 font-bold ml-2">{product.payment}</span>
</p>

            <p className="text-gray-500">📍 {product.location}</p>
            <p className="text-red-500 font-bold text-lg">🔥 {product.discount} OFF</p>
            <button
              className="mt-3 px-4 py-2 bg-[#388691] text-white rounded-lg hover:bg-green-600"
              onClick={() => navigate("/shop-confirm", { state: { productName: product.name } })}
            >
              Would Love to Buy
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={() => navigate("/main")}
      >
        Close
      </button>
    </div>
    </>
  );
};

export default Shop;