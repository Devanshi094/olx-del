import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Icon for back button
import logo from "../../assets/logo.png";

const ContactForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        window.location.href = "/thank-you";
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center bg-white shadow-md p-4">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
          <ArrowLeft size={24} />
        </button>
        <h2 className="flex-1 text-center text-3xl font-semibold">Contact Us</h2>
      </nav>

      {/* Contact Form */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <img src={logo} alt="Logo" className="w-24 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-center text-sea-green-600 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-center mb-4">
            We will get back to you ASAP!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-1/2 p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 p-2 border rounded"
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full h-32 p-2 border rounded resize-none"
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full p-2 bg-[#2A7F80] text-white rounded hover:bg-[#236b6c]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
