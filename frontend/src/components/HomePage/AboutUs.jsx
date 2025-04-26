import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import girl from "../../assets/girl.png";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-[#183056] min-h-screen">
      {/* Navbar */}
      <div className="flex items-center p-4 bg-white shadow-md w-full">
        <button onClick={() => navigate("/main")} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-semibold mx-auto">About Us</h1>
      </div>

      {/* Hero Section */}
      <div className="relative h-[300px] flex items-center justify-center bg-cover bg-center bg-[#a3cced]">
        <h2 className="text-4xl font-bold p-4 rounded-lg">Welcome to DEL - Discover, Explore, List</h2>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h3 className="text-3xl font-semibold mb-4">Who We Are</h3>
        <p className="text-lg mb-6">
          At DEL, we aim to bridge the gap between buyers and sellers by providing a seamless platform
          for listing, discovering, and purchasing a wide range of products. Whether you&apos;re searching
          for the latest gadgets, fashion items, or home essentials, DEL is your one-stop solution.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h3 className="text-3xl font-semibold mb-4">Meet Our Team</h3>
        <img src={girl} alt="Our Team" className="mx-auto rounded-lg shadow-lg" />
        <p className="text-lg mt-4">
          Our dedicated team of professionals is committed to delivering the best experience for our users.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h3 className="text-3xl font-semibold mb-4">Our Mission & Vision</h3>
        <p className="text-lg mb-6">
          Our mission is to empower individuals and businesses to buy and sell with confidence. We envision
          a marketplace where convenience meets reliability, ensuring that every transaction is smooth and secure.
        </p>
      </div>

      {/* Call to Action */}
      <div className="bg-[#388691] text-white p-6 text-center rounded-lg max-w-4xl mx-auto mt-6">
        <h3 className="text-2xl font-semibold">Join Us Today!</h3>
        <p className="text-lg mt-2">Start exploring and listing your products on DEL now.</p>
        <button onClick={() => navigate("/main")} className="mt-4 bg-white text-[#388691] px-4 py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;