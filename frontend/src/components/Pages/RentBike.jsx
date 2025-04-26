import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./RentBike.jsx"; // ✅ Fixed import
import bike1 from "../../assets/cars&bikes/bike1.jpeg";
import bike2 from "../../assets/cars&bikes/bike2.jpeg";
import bike3 from "../../assets/cars&bikes/bike3.jpeg";
const RentBike = () => {
  const navigate = useNavigate();

  const bikes = [
    {
      name: "Royal Enfield Classic 350",
      price: "₹1,000/day",
      location: "Pune, India",
      image: [bike1],
      fuel: "Fuel included",
      payment:"pay via UPI or else cash on pickup"
    },
    {
      name: "Bajaj Pulsar NS200",
      price: "₹800/day",
      location: "Hyderabad, India",
      image: [bike2],
      fuel: "Fuel not included",
      payment:"pay via UPI or else cash on pickup"
    },
    {
      name: "Yamaha R15 V4",
      price: "₹1,500/day",
      location: "Chennai, India",
      image: [bike3],
      fuel: "Fuel included",
      payment:"only cash on pickup"
    },
  ];

  return (
    <>
     {/* Navbar with Back Button */}
     <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        <button onClick={() => navigate("/rental")} className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </nav>
    <div className="min-h-screen bg-white-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Rent a Bike 🏍️</h1>
      {bikes.map((bike, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4 w-3/4">
          <img src={bike.image[0]} alt={bike.name} className="w-80 h-30 object-cover rounded-lg mx-auto" />
          <h2 className="text-xl font-bold mt-2">{bike.name}</h2>
          <p className="text-gray-700">{bike.price}</p>
          <p className="text-gray-500">{bike.location}</p>
          <p className="text-green-600 font-semibold">{bike.fuel}</p>
          <button
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => navigate("/rent-detail")}
          >
            Would Love to Rent
          </button>
        </div>
      ))}
      <button
        className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={() => navigate("/rent-request")}
      >
        Back to Rental Options
      </button>
    </div>
    </>
  );
};

export default RentBike;