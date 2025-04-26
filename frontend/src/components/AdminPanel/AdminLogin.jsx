import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const adminCredentials = {
    email: "admin123@gmail.com",
    password: "admin$123",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password
    ) {
      localStorage.setItem("adminToken", "static-token");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 relative">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mix-blend-multiply opacity-50 blur-3xl animate-pulse"></div>
      <div className="absolute top-10 right-10 w-60 h-60 bg-gradient-to-bl from-blue-400 to-purple-500 rounded-full mix-blend-multiply opacity-50 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tl from-purple-500 to-pink-500 rounded-full mix-blend-multiply opacity-50 blur-3xl animate-pulse"></div>

      <div className="bg-white p-8 shadow-2xl rounded-3xl w-96 z-10 relative border-2 border-gray-100">
        <h2 className="text-4xl font-extrabold mb-4 text-center text-gray-800 leading-tight">
          Admin <span className="text-purple-600">Login</span>
        </h2>
        <p className="text-gray-500 text-center mb-6">Welcome back! Login to access your admin panel.</p>

        {error && <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            🚀 CONTINUE
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <a href="#" className="text-pink-500 hover:underline hover:text-purple-600">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;