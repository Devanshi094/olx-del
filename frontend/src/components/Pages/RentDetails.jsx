import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RentDetails = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
    propertyType: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/rent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (data.success) {
        alert("Data saved successfully!");
        navigate("/rent-request"); // Redirect after submission
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Interested in Renting?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={userDetails.name}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={userDetails.phone}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700">Gender</label>
          <input
            type="text"
            name="gender"
            placeholder="Enter your gender"
            value={userDetails.gender}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700">Your Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            value={userDetails.location}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700">Property Type</label>
          <select
            name="propertyType"
            value={userDetails.propertyType}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a Property Type</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentDetails;
