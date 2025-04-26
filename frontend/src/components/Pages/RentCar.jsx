import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./RentCar.jsx"; // ✅ Fixed import
import car1 from "../../assets/cars&bikes/car1.jpeg";
import car2 from "../../assets/cars&bikes/car2.jpeg";
import car3 from "../../assets/cars&bikes/car3.jpeg";

const RentCar = () => {
  const navigate = useNavigate();

  const cars = [
    {
      name: "Hyundai Creta",
      price: "₹2,500/day",
      location: "Mumbai, India",
      images: [car1],
      fuel: "Fuel included",
      payment: "Pay via UPI or else cash on pickup",
    },
    {
      name: "Maruti Suzuki Swift",
      price: "₹1,800/day",
      location: "Delhi, India",
      images: [car2],
      fuel: "Fuel not included",
      payment: "Only cash on pickup",
    },
    {
      name: "Toyota Innova Crysta",
      price: "₹3,000/day",
      location: "Bangalore, India",
      images: [car3],
      fuel: "Fuel included",
      payment: "Pay via UPI or else cash on pickup",
    },
  ];

  return (
    <>
    <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        <button onClick={() => navigate("/rental")} className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </nav>
    <div className="min-h-screen bg-white-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Rent a Car 🚗</h1>
      {cars.map((car, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4 w-3/4">
          <img src={car.images[0]} alt={car.name} className="w-100 h-60 object-cover rounded-lg mx-auto" />
          <h2 className="text-xl font-bold mt-2">{car.name}</h2>
          <p className="text-gray-700">{car.price}</p>
          <p className="text-gray-500">{car.location}</p>
          <p className="text-green-600 font-semibold">{car.fuel}</p>
          <p className="text-green-600 font-semibold">{car.payment}</p>
          <button
            className="mt-3 px-4 py-2 bg-[#388691] text-white rounded-lg"
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
        Submit
      </button>
    </div>
    </>
  );
};

export default RentCar;