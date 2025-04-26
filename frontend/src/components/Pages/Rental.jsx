import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import an icon for back arrow

const Rental = () => {
  const navigate = useNavigate();
  const [rentals] = useState([
    { id: 1, item: "Car", price: "₹1,500/day - ₹3,000/day", link: "/rent-car" },
    { id: 2, item: "Bike", price: "₹500/day - ₹2,000/day", link: "/rent-bike" },
    { id: 3, item: "Apartment/House", price: "₹10,000 - ₹45,000 monthly", link: "/rent-house" },
  ]);

  return (
    <>
     {/* Navbar with Back Button */}
     <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        <button onClick={() => navigate("/main")} className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </nav>
    <div className="min-h-screen bg-gray-100">

      {/* Rental Content */}
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold text-center mb-10">Rental Options!</h1>

        <div className="bg-white p-6 rounded-lg shadow-md w-3/4 text-center">
          <h2 className="text-lg font-semibold mb-4">Available for Rent</h2>
          <ul>
            {rentals.map((rental) => (
              <li key={rental.id} className="mb-4">
                <p className="text-lg font-semibold">
                  <strong>{rental.item}</strong> - {rental.price}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => navigate(rental.link)}
                >
                  Rent Now
                </button>
              </li>
            ))}
          </ul>
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
    </>
  );
};

export default Rental;
