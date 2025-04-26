import { useState } from "react";
import axios from "axios";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Lock, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth"; 

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
    const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Toggle between Sign In and Sign Up
  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update the handleSubmit function in SignIn.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const url = isSignIn
    ? "http://localhost:5000/api/auth/login"
    : "http://localhost:5000/api/auth/signup";

  try {
    const response = await axios.post(url, formData);
    console.log("Response:", response.data);

    // For login, store the user data in AuthContext
    if (isSignIn) {
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // IMPORTANT FIX: Make sure we're storing the correct user ID
      login({
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email
      });
      
      alert("Login successful!");
      navigate("/main");
    } else {
      alert("Signup successful, please login now!");
      setIsSignIn(true);
    }
  } catch (error) {
    console.error("Error:", error.response?.data.message);
    alert(error.response?.data.message || "An error occurred");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EAF4F5]">
      <Card className="relative w-[1100px] h-[600px] shadow-xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
        {/* Left/Right Side - Static Welcome Message */}
        <div
          className={`absolute top-0 w-1/2 h-full flex flex-col items-center justify-center p-8 bg-[#388691] text-white transition-all duration-700 ease-in-out ${
            isSignIn ? "left-0" : "left-1/2"
          }`}
        >
          <h2 className="text-4xl font-bold mb-6">
            {isSignIn ? "Welcome Back!" : "Hello, Friend!"}
          </h2>
          <p className="text-gray-200 mb-6 text-center">
            {isSignIn
              ? "Sign in with your existing account."
              : "Sign up to create a new account."}
          </p>
        </div>

        {/* Right/Left Side - Form Section */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-white p-8 flex flex-col justify-center transition-all duration-700 ease-in-out ${
            isSignIn ? "left-1/2" : "left-0"
          }`}
        >
          {isSignIn ? (
            // Sign In Form
            <form onSubmit={handleSubmit} className="w-full">
              <h2 className="text-3xl font-bold text-[#183056] mb-6 text-center">
                Sign In
              </h2>
              <div className="mb-4 relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#388691]"
                  size={20}
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#388691] focus:border-transparent"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-4 relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#388691]"
                  size={20}
                />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#388691] focus:border-transparent"
                  placeholder="Password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#388691] text-white py-3 rounded-lg shadow-md hover:bg-[#183056] transition-all"
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don&apos;t have an account?{" "}
                <span
                  className="text-[#388691] font-semibold cursor-pointer hover:underline"
                  onClick={toggleMode}
                >
                  Sign Up here
                </span>
              </p>
            </form>
          ) : (
            // Sign Up Form
            <form onSubmit={handleSubmit} className="w-full">
              <h2 className="text-3xl font-bold text-[#183056] mb-6 text-center">
                Sign Up
              </h2>
              <div className="mb-4 relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#388691]"
                  size={20}
                />
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#388691] focus:border-transparent"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="mb-4 relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#388691]"
                  size={20}
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#388691] focus:border-transparent"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-4 relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#388691]"
                  size={20}
                />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#388691] focus:border-transparent"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="mb-4 relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#388691]"
                  size={20}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#388691] focus:border-transparent"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#388691] text-white py-3 rounded-lg shadow-md hover:bg-[#183056] transition-all"
              >
                Sign Up
              </Button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <span
                  className="text-[#388691] font-semibold cursor-pointer hover:underline"
                  onClick={toggleMode}
                >
                  Sign In here
                </span>
              </p>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}